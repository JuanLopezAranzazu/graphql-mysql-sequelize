const { gql } = require("apollo-server");
// type defs
const TypeDefsUser = require("./typeDefs/User");
const TypeDefsRole = require("./typeDefs/Role");
const TypeDefsGroup = require("./typeDefs/Group");

const typeDefs = gql`
  ${TypeDefsUser}

  ${TypeDefsRole}

  ${TypeDefsGroup}
`;

module.exports = { typeDefs };
