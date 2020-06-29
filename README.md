# express-helper

Based on `express` code generator and `url-metadata` npm module.

## Roadmap:

- [x] [url-metadata](#url-metadata)
- [x] [reCAPTCHA-v3](#recaptcha-v3)

### Quick start

```bash
npm i
npm run dev
```

## url-metadata

[Swagger](http://pravosleva.ru/express-helper/swagger/#/default/get_url_metadata_editorjs). See also `http://localhost:5000/swagger/`.

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

[Swagger](http://pravosleva.ru/express-helper/swagger/#/default/post_recaptcha_v3_verify). See also `http://localhost:5000/swagger/`.

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
