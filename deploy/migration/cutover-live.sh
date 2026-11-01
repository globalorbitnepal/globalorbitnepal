#!/usr/bin/env bash
# Run once on the VPS with sudo (DNS must point @ and www to this server IP):
#   cd /home/sysadmin/srv/apps/globalorbitnepal && sudo bash deploy/migration/cutover-live.sh
set -euo pipefail

APP_ROOT="/home/sysadmin/srv/apps/globalorbitnepal"
HTTP_VHOST="$APP_ROOT/deploy/migration/nginx/theglobalorbit.com.http-only.conf"
FULL_VHOST="$APP_ROOT/deploy/migration/nginx/theglobalorbit.com.conf"
ARNAV_REDIRECT="$APP_ROOT/deploy/migration/nginx/arnav-to-apex-redirect.conf.disabled"
SITES_AVAILABLE="/etc/nginx/sites-available/theglobalorbit.com"
SITES_ENABLED="/etc/nginx/sites-enabled/theglobalorbit.com"
CERT_EMAIL="${CERTBOT_EMAIL:-support@theglobalorbit.com}"

echo "==> Installing HTTP vhost (proxy to :3031)..."
cp "$HTTP_VHOST" "$SITES_AVAILABLE"
ln -sf "$SITES_AVAILABLE" "$SITES_ENABLED"
nginx -t
systemctl reload nginx

echo "==> Requesting Let's Encrypt certificates..."
if ! certbot certonly --nginx \
  -d theglobalorbit.com \
  -d www.theglobalorbit.com \
  --non-interactive --agree-tos -m "$CERT_EMAIL" \
  --redirect; then
  echo "Certbot failed. Check DNS (dig +short theglobalorbit.com A) points to this server."
  exit 1
fi

echo "==> Installing full HTTPS vhost..."
cp "$FULL_VHOST" "$SITES_AVAILABLE"
if ! nginx -t; then
  echo "nginx test failed — trying legacy http2 listen syntax fix..."
  sed -i 's/listen 443 ssl;$/listen 443 ssl http2;/g; s/listen \[::\]:443 ssl;$/listen [::]:443 ssl http2;/g; /^[[:space:]]*http2 on;$/d' "$SITES_AVAILABLE"
  nginx -t
fi
systemctl reload nginx

echo "==> Staging hostname → apex 301..."
if [[ -f "$APP_ROOT/deploy/migration/nginx/arnav.theglobalorbit.com.live-snapshot.conf" ]]; then
  cp /etc/nginx/sites-available/globalorbitnepal \
    "/etc/nginx/sites-available/globalorbitnepal.bak-before-redirect-$(date +%Y%m%d%H%M%S)" 2>/dev/null || true
fi
# Replace arnav vhost with redirect blocks (same cert paths as live arnav)
cat > /etc/nginx/sites-available/globalorbitnepal <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name arnav.theglobalorbit.com;
    return 301 https://theglobalorbit.com$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name arnav.theglobalorbit.com;
    ssl_certificate     /etc/letsencrypt/live/arnav.theglobalorbit.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/arnav.theglobalorbit.com/privkey.pem;
    return 301 https://theglobalorbit.com$request_uri;
}
NGINX
nginx -t
systemctl reload nginx

echo "==> App env + rebuild (if not already done)..."
grep -q '^NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com' "$APP_ROOT/.env" || \
  echo 'NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com' >> "$APP_ROOT/.env"
sudo -u sysadmin bash -lc "cd $APP_ROOT && npm run build && pm2 restart globalorbitnepal --update-env"

echo ""
echo "Live: https://theglobalorbit.com"
echo "Verify: curl -sI https://theglobalorbit.com | head -5"
