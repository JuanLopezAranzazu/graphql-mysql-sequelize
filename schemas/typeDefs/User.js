const typeDefs = `
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    Role: Role!
    Groups: [Group!]
  }

  type Query {
    findAllUsers: [User!]
    findOneUser(id: ID!): User
    groupsByUser: [Group!]
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
    role: Roles! = USER
  }

  input LoginUserInput {
    username: String!
    password: String!
  }

  input ChangePasswordInput {
    oldPassword: String!
    newPassword: String!
  }

  input JoinGroupInput {
    GroupId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    loginUser(input: LoginUserInput!): String
    changePassword(input: ChangePasswordInput!): User
    joinGroup(input: JoinGroupInput!): String
  }
`;

module.exports = typeDefs;
