import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
    query GetUser {
        getUser {
            savedBooks {
                bookId
                description
                image
                link
                title
                authors
            }
        }
    }
`;
export const GET_ME = gql`
    query GetUser {
        getUser {
            savedBooks {
                bookId
                description
                image
                link
                title
                authors
            }
        }
    }
`;
export const GET_USER = gql`
    query GetUser {
        getUser {
            savedBooks {
                bookId
                description
                image
                link
                title
                authors
            }
            username
            _id
            email
        }
    }
`;
