# express-helper

## Roadmap:
- [x] [url-metadata](#url-metadata)
- [ ] [reCAPTCHA-v3](#recaptcha-v3)

## url-metadata

Based on `express` code generator and `url-metadata` npm module.

### Quick start

```bash
npm i
npm run dev
```

### Sample

**Req**
```bash
GET `http://localhost:3000/url-metadata/editorjs?url=<YOUR_PAGE_URL>`
```

**Res 200** _TODO: Swagger doc_
```js
{
  "success": 1,
  "meta": {
    // metadata for you page url
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
      }
    },
  },
})
```

## recaptcha-v3

`.env`
```env
RECAPTCHAV3_VERIFY_URL=https://www.google.com/recaptcha/api/siteverify
RECAPTCHAV3_SERVER_KEY=<RECAPTCHAV3_SERVER_KEY>
```

**Req**
```
POST `http://localhost:5000/recaptcha-v3/verify`
{
  captcha: string
}
```

**Res 200**
```js
{
  success: 1,
  original: {}, // Like original format
}
```

[https://developers.google.com/recaptcha/docs/verify#api_response](https://developers.google.com/recaptcha/docs/verify#api_response)
