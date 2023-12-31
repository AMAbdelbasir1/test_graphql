const { gql } = require("apollo-server");
module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Query {
    hello: String
  }
  input userInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input loginInput {
    username: String!
    password: String!
  }
  type Mutation {
    signup(input: userInput): User
    login(input: loginInput): User
  }
`;
