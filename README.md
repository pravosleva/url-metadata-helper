## url-metadata-helper

Based on `express` code generator and `url-metadata` npm module.

## Quick start

```bash
npm i
npm run dev
```

## Sample

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

## Usage in config for `Editor.js`

```js
const editor = new EditorJS({
  holderId: 'editorjs',
  tools: {
    // ...
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: 'http://localhost:3000/url-metadata/editorjs', // Your backend endpoint for url data fetching
      }
    },
  },
})
```
