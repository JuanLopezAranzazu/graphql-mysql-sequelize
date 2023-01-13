const typeDefs = `
  type Role {
    id: ID!
    name: String!
  }

  enum Roles {
    ADMIN
    USER
  }
`;

module.exports = typeDefs;
