const { gql } = require("apollo-server");
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    user: User!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID): Post
  }
  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
  type Subscription {
    newPost: Post
  }
`;
