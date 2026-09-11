/**
 * PM2 configuration for GlobalOrbitNepal only.
 * Do not start or restart HostingBeyond from this file.
 * Bind to 127.0.0.1. Nginx for arnav.theglobalorbit.com proxies here.
 *
 * Process name: globalorbitnepal
 * Port: 3031
 */
module.exports = {
  apps: [
    {
      name: "globalorbitnepal",
      cwd: "/srv/apps/globalorbitnepal",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3031 -H 127.0.0.1",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3031",
        HOSTNAME: "127.0.0.1",
        UPLOAD_DIR: "/data/globalorbitnepal/uploads",
      },
    },
  ],
};
