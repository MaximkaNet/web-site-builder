# web-site-builder

### API routes

POST /api/auth/login - returns { "token": "<token>" }
POST /api/auth/register - request: {"email": "<email>", "password": "<password>"}, response: { "token": "<token>" }

POST /api/manual/create - create new manual for authorized user. Response: {"id": "<id>"}
GET /api/manual - get manuals for authorized user. Response: [{"id", "title", "description", "blocks", "userId"}]

GET /api/manual/:id - get manual by id {"id", "title", "description", "blocks", "userId"}
PATCH /api/manual/:id/blocks - request: {"blocks": "<string json>"}, response: NotContent

### Routes

auth
home
dashboard
builder
preview

### Export
- PDF
- Static website

### Website structure

```js

const types = [
  "container",
  "image",
  "audio",
  "video"
]

const html = {
  head: {
    title: "",
    link: [
      {
        type: "css"
        src: "@/path/to/file"
      }
    ],
    scripts: [
      {
        type: "javascript",
        src: ""
      }
    ]
  },
  body: {
    children: [
      {
        type: "container",
        text: "",
        before: {

        },
        after: {

        }
      }
    ]
  }
}

const element = {
  type: "",
  // Specific attributes for element
  children: [
    // Child elements
  ]
}

```