echo '{
  "prod:restart-all": {
    "user": "<USER>",
    "host": "<HOST>",
    "port": "<PORT>",
    "files": "bin app.js public routes utils package.json package-lock.json *.yaml yarn.lock README.md",
    "path": "/home/path-to-dir/pravosleva-blog/express-helper",
    "pre-deploy-remote": "pm2 stop all",
    "post-deploy": "pm2 delete all; yarn; pm2 resurrect --update-env"
  },
  "prod:restart-helper": {
    "user": "<USER>",
    "host": "<HOST>",
    "port": "<PORT>",
    "files": "bin app.js public routes utils package.json package-lock.json *.yaml yarn.lock README.md",
    "path": "/home/path-to-dir/pravosleva-blog/express-helper",
    "post-deploy": "pm2 stop 2; yarn; pm2 restart 2 --update-env"
  },
  "dev": {},
  "staging": {}
}' > deploy-app-config.js
