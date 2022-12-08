import { GatsbyNode } from 'gatsby'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  plugins,
  reporter,
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.provide({
        React: 'react',
      }),
    ],
  })

  reporter.info(`Provided React in all files`)
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type Author {
        name: String
        photo: String
      }
      type Mdx implements Node {
        frontmatter: Frontmatter
      }
      type Frontmatter {
        author: Author
        relatedPosts: [Mdx]
      }
    `
    createTypes(typeDefs)
  }

export const createResolvers: GatsbyNode['createResolvers'] = ({
  createResolvers,
}) => {
  const resolvers = {
    Frontmatter: {
      author: {
        type: 'Author',
        resolve: async (source, args, context, info) => {
          const author = await context.nodeModel.findOne({
            query: {
              filter: {
                fileAbsolutePath: { glob: `**/employees/${source.author}.md` },
                frontmatter: {
                  templateKey: { eq: 'employee' },
                },
              },
            },
            type: 'MarkdownRemark',
          })

          return author.frontmatter
        },
      },
      relatedPosts: {
        type: ['Mdx'],
        resolve: async (source, args, context, info) => {
          const relatedPosts = source.relatedPosts

          if (!source.relatedPosts) return null

          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                frontmatter: {
                  slug: { in: relatedPosts, ne: source.slug },
                },
              },
            },
            type: 'Mdx',
          })

          return entries
        },
      },
    },
  }
  createResolvers(resolvers)
}
