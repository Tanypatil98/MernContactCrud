const typeDefs = `
  type Query {
    hello(name: String): String!
    getContacts: [Contact]
    getContact(id: ID!): [Contact]
  }

  type Mutation {
    addContact(input: ContactInput): Contact
    updateContact(id: ID!, input: ContactInput): Contact
    deleteContact(id: ID!): Contact
  }

  input ContactInput {
    name: String
    email: String
    phone: Float 
  }

  type Contact {
    id: ID
    name: String
    email: String
    phone: Float 
  }
`;

module.exports = typeDefs;