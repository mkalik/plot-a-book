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
        getUser: async (parent, args, context) => {
            console.log(context);
            return User.findOne({ _id: context._id }).populate('savedBooks');
        },
    },
    Mutation: {
        loginUser: async (parent, { username, password }) => {
            const user = await User.findOne({
                $or: [{ email: username }, { username: username }],
            });
            console.log(user);
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
            console.log('this is context:', context);
            const book = {
                authors,
                description,
                bookId,
                image,
                link,
                title,
            };
            console.log(book);
            const user = await User.findOneAndUpdate(
                { _id: context._id },
                { $addToSet: { savedBooks: book } },
                { new: true }
            );
            console.log({ user });

            return book;
        },

        deleteBook: async (parent, { bookId, username }, context) => {
            const user = User.findOneAndUpdate(
                { $or: [{ _id: context._id }, { username: username }] },
                {
                    $pull: { savedBooks: { bookId: bookId } },
                },
                { new: true }
            );
            return user;
        },
    },
};

module.exports = resolvers;
