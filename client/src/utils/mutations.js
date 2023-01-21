import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }

`;


export const ADD_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }

`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookID: ID!) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookID
            authors
            title
            description
            image
            link
        }
    }
`