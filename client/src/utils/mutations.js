import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
    mutation SaveBook(
        $description: String!
        $bookId: String!
        $title: String!
        $authors: [String]
        $image: String
        $link: String
    ) {
        saveBook(
            description: $description
            bookId: $bookId
            title: $title
            authors: $authors
            image: $image
            link: $link
        ) {
            _id
            description
            bookId
            title
            authors
            link
            image
        }
    }
`;
export const ADD_USER = gql`
    mutation CreateUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                savedBooks {
                    authors
                    bookId
                    description
                    image
                    link
                    title
                }
            }
        }
    }
`;
export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(username: $email, password: $password) {
            token
            user {
                savedBooks {
                    authors
                    bookId
                    description
                    image
                    link
                    title
                }
            }
        }
    }
`;
export const DEL_BOOK = gql`
    mutation SaveBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            savedBooks {
                description
                bookId
                title
            }
        }
    }
`;
