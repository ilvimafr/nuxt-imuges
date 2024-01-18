export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    images: Image
  }
  type Image {
    id: ID!
    name: String!
    author: User!
  }
  type Query {
    users: [User]
  }
`