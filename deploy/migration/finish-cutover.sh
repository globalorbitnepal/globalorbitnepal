#!/usr/bin/env bash
# Run after certbot succeeded but "http2 on" failed (nginx 1.24):
#   cd /home/sysadmin/srv/apps/globalorbitnepal && sudo bash deploy/migration/finish-cutover.sh
set -euo pipefail
APP_ROOT="/home/sysadmin/srv/apps/globalorbitnepal"
cp "$APP_ROOT/deploy/migration/nginx/theglobalorbit.com.conf" /etc/nginx/sites-available/theglobalorbit.com
nginx -t
systemctl reload nginx

cat > /etc/nginx/sites-available/globalorbitnepal <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name arnav.theglobalorbit.com;
    return 301 https://theglobalorbit.com$request_uri;
}
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name arnav.theglobalorbit.com;
    ssl_certificate     /etc/letsencrypt/live/arnav.theglobalorbit.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/arnav.theglobalorbit.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    return 301 https://theglobalorbit.com$request_uri;
}
NGINX
nginx -t
systemctl reload nginx
echo "OK — https://theglobalorbit.com should serve this app. Test:"
curl -sI https://theglobalorbit.com/robots.txt | head -5
