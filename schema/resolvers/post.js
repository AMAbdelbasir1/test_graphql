const { AuthenticationError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const Post = require("../../models/post");
module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find()
          .populate("user")
          .sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, args) => {
      try {
        const postId = args.postId;
        const post = await Post.findById(postId).populate("user");
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      await context.pubsub.publish("NEW_POST", {
        newPost: post,
      });
      // console.log(context.pubsub);

      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(["NEW_POST"]),
    },
  },
};
