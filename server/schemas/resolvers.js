const { signToken } = require('../utils/auth.js');
const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getSingleUser: async (parent, { username, _id }) => {
            const user = await User.findOne({
                $or: [{ _id: _id }, { username: username }],
            });
            return user;
        },
        getUsers: async (parent, args, context) => {
            console.log(context.user);
            return User.find();
        },
    },
    Mutation: {
        loginUser: async (parent, { username, email, password }) => {
            const user = await User.findOne({
                $or: [{ email: email }, { username: username }],
            });
            if (!user) {
                throw new AuthenticationError('user not found');
            }

            const checkPass = await user.isCorrectPassword(password);
            if (!checkPass) {
                throw new AuthenticationError('incorrect login values');
            }
            const token = signToken(user);
            return { token, user };
        },
        createUser: async (parent, { username, email, password }) => {
            const newUser = await User.create({ username, email, password });
            const token = signToken(newUser);
            console.log(token);
            return { token, newUser };
        },
        saveBook: async (
            parent,
            { authors, description, bookId, image, link, title },
            context
        ) => {
            const book = await Book.create({
                authors,
                description,
                bookId,
                image,
                link,
                title,
            });
            const user = User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } }
            );
            return user;
        },

        deleteBook: async (parent, { bookId, username }, context) => {
            const user = User.findOneANdUpdate(
                { $or: [{ _id: context.user._id }, { username: username }] },
                {
                    $pull: { savedBooks: { $in: [bookId] } },
                }
            );
        },
    },
};

module.exports = resolvers;
