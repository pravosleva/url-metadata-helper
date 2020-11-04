# express-helper

Based on `express` code generator.

## Roadmap:

- [x] [Quick start](#quick-start)
- [x] [Deploy](#deploy)
- [x] [url-metadata](#url-metadata)
- [x] [reCAPTCHA-v3](#recaptcha-v3)
- [x] [Smartprice helper](#smartprice-helper)

## quick-start

```bash
yarn
yarn dev
```

## deploy

> ⚡ Once: `bash deploy-app-config-init.sh`
>
> _Init config template_

### `yarn deploy:prod:restart-all`

_Local build then deploy and restart all current pm2 processes_

### `yarn deploy:prod:restart-helper`

_Local build then deploy then `pm2 restart 2`_

`deploy-app-config.json`

```js
{
  "prod:restart-all": {
    "user": "<USER>",
    "host": "<HOST>",
    "port": "<PORT>",
    // "files": "bin app.js public routes utils *.json *.yaml yarn.lock",
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
}
```

## Test

```bash
yarn test
```

## url-metadata

Based on `url-metadata` npm module. See [Swagger](http://pravosleva.ru/express-helper/swagger/#/default/get_url_metadata_editorjs). And [local instance](http://localhost:5000/swagger/#/default/get_url_metadata_editorjs).

### Sample

_Req_

```bash
GET `http://localhost:5000/url-metadata/editorjs?url=<YOUR_PAGE_URL>`
```

_Res: 200_

```js
{
  "success": 1,
  "meta": {
    // metadata for your page url
  }
}
```

### Usage in config for `Editor.js`

```js
const editor = new EditorJS({
  holderId: 'editorjs',
  tools: {
    // ...
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: 'http://localhost:5000/url-metadata/editorjs', // Your backend endpoint for url data fetching
      },
    },
  },
})
```

## recaptcha-v3

[Swagger](http://pravosleva.ru/express-helper/swagger/#/default/post_recaptcha_v3_verify). And [local instance](http://localhost:5000/swagger/#/default/post_recaptcha_v3_verify).

`.env`

```env
RECAPTCHAV3_VERIFY_URL=https://www.google.com/recaptcha/api/siteverify
RECAPTCHAV3_SERVER_KEY=<RECAPTCHAV3_SERVER_KEY>
```

### Sample

_Req_

```
POST `http://localhost:5000/recaptcha-v3/verify`
{ captcha: string }
```

_Res: 200_

```js
{
  success: 1,
  original: {}, // Like original format
}
```

## smartprice-helper

### NGINX settings

`/etc/nginx/nginx.conf`

```bash
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {
	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
}
```

`/etc/nginx/conf.d/default.conf`

```bash
server {
  listen 80;
  client_max_body_size 32m;
  server_tokens off;
  proxy_http_version 1.1;

  location / {
    if ($request_method = 'POST') {
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
      add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }
    if ($request_method = 'GET') {
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
      add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }
    proxy_pass          http://127.0.0.1:3000;
    proxy_http_version  1.1;
  }

  # location /api {
  #   rewrite ^/api/(.*)$ /$1 break;
  #   proxy_pass          http://127.0.0.1:5000/smartprice/api/$1
  # }
  location  ~ ^/api/(.*)$ {
    proxy_pass   http://127.0.0.1:5000/smartprice/api/$1;
  }
}
```

## See also original docs

- [https://developers.google.com/recaptcha/docs/verify#api_response](https://developers.google.com/recaptcha/docs/verify#api_response)
- [https://developers.google.com/recaptcha/docs/v3#site_verify_response](https://developers.google.com/recaptcha/docs/v3#site_verify_response)
