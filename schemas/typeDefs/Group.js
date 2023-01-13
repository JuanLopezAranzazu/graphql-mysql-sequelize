const typeDefs = `
  type Group {
    id: ID!
    name: String!
    Users: [User!]
  }

  input CreateGroupInput {
    name: String!
  }

  input UpdateGroupInput {
    name: String
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group
    updateGroup(input: UpdateGroupInput): Group
    deleteGroup(id: ID!): String
  }

  type Query {
    findAllGroups: [Group!]
    findOneGroup: Group
  }
`;

module.exports = typeDefs;
