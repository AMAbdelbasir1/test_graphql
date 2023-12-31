const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const userType = require("./schema/typedefs/user");
const postType = require("./schema/typedefs/post");
const commentAndLikeType = require("./schema/typedefs/comment");
const userRes = require("./schema/resolvers/user");
const postRes = require("./schema/resolvers/post");
const commentAndLikeRes = require("./schema/resolvers/comment");
const mongo = require("mongoose");
require("dotenv").config();
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs: [userType, postType, commentAndLikeType],
  resolvers: [userRes, postRes, commentAndLikeRes],
  context: ({ req }) => ({ req, pubsub }),
});

mongo
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB conneced");
    server.listen(3000, () => {
      console.log("Server running now");
    });
  })
  .catch((err) => {
    console.log(err);
  });
