# Website

## Develop

Need node.js v18.12.1 as indicated in `.nvmrc`. Download the version on
[Node.js website](https://nodejs.org/download/release/v18.12.0/) or install the
[NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) and run `nvm use` at
the root of this project.

1. `npm install`
2. `npm start`

## Problem

Can't have optimized image like this query

```
query MyQuery {
  mdx(id: {eq: "f4c77c77-ddca-5c8d-870f-b5260a6de714"}) {
    frontmatter {
      heading {
        image {
          childImageSharp {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  }
}
```

It gives this return

```
{
  "errors": [
    {
      "message": "Field \"image\" must not have a selection since type \"String\" has no subfields.",
      "locations": [
        {
          "line": 5,
          "column": 15
        }
      ]
    }
  ]
}
```
