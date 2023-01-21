const { gql } = require('apollo-server-express')

const typeDefs = gql`

input BookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}

type User {
    _id: ID
    username: string
    email: string
    bookCount: Int
    savedBooks [Book]

}

type Book {
    bookID : String
    authors: [String]
    description: string
    title: string
    image: string
    link: string
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
 }

type Mutation {
    login(email: String!, password: String!):Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookID: ID!): User
}

`

module.exports = typeDefs;