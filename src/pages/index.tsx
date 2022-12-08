import { FunctionComponent, ReactNode } from 'react'
import { graphql, PageProps } from 'gatsby'

interface Data {
  page: {
    childMarkdownRemark: {
      frontmatter: {
        heading: {
          title: ReactNode
          text: string
          image: string
        }
      }
    }
  }
}

const IndexPage: FunctionComponent<PageProps<Data>> = ({
  data: {
    page: {
      childMarkdownRemark: { frontmatter },
    },
  },
}) => {
  return <pre>{JSON.stringify(frontmatter, null, 2)}</pre>
}

export const query = graphql`
  query {
    page: file(relativePath: { glob: "**/pages/homepage.md" }) {
      childMarkdownRemark {
        frontmatter {
          heading {
            title
            text
            image {
              childImageSharp {
                gatsbyImageData(width: 200)
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
