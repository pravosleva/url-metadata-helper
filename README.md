# express-helper

Based on `express` code generator.

## Quick start

```bash
npm i
npm run dev
```

## Roadmap:

- [x] [url-metadata](#url-metadata)
- [x] [reCAPTCHA-v3](#recaptcha-v3)

## Deploy

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
    "post-deploy": "pm2 delete all; pm2 resurrect --update-env"
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
  holderId: "editorjs",
  tools: {
    // ...
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: "http://localhost:5000/url-metadata/editorjs", // Your backend endpoint for url data fetching
      },
    },
  },
});
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

### See also original docs

- [https://developers.google.com/recaptcha/docs/verify#api_response](https://developers.google.com/recaptcha/docs/verify#api_response)
- [https://developers.google.com/recaptcha/docs/v3#site_verify_response](https://developers.google.com/recaptcha/docs/v3#site_verify_response)
