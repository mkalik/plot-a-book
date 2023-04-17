const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }
    type Book {
        _id: ID
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
    #    input InfoBook {
    #        _id: ID
    #        authors: [String]
    #        description: String!
    #        bookId: String!
    #        image: String
    #        link: String
    #        title: String!
    #    }

    type Auth {
        token: ID!
        user: User
    }
    type Query {
        getSingleUser: User
        getUser: User
    }
    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(
            authors: [String]
            description: String!
            bookId: String!
            image: String
            link: String
            title: String!
            username: String
        ): Book
        deleteBook(bookId: String!): User
        loginUser(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
