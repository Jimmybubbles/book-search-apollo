//import destructured user from models
const { User } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth")


const resolvers = {
    Query: {

        // get a user by username
        me: async (parent, args, context) => {

            if (context.user) {
                const userData = await User
                    .findOne({ _id: context.user._id })
                    .select('__v -password')
                    .populate("books")

                return userData;
            }

            throw new AuthenticationError('Not logged in')
        }
    },

    Mutations: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect login credentials!")
            };

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError("incorrect login credentials!")
            };

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User
                    .findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: bookData } },
                        { new: true },
                    )

                    .populate("books");
                return updatedUser;
            };

            throw new AuthenticationError("you must be logged in to save books ")
        },

        removeBook: async (parent, { bookID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookID } } },
                    { new: true },
                )
                return updatedUser
            }

            throw new AuthenticationError("You must be logged in to delete books")
        }

    }

}

module.exports = resolvers;

module.exports = resolvers