const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input UserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    createdAt: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    signup(input: UserInput): User
  }
`;

module.exports = {typeDefs};
