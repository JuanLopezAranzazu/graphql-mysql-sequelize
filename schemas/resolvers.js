// queries
const QueriesUser = require("./resolvers/User");
const QueriesGroup = require("./resolvers/Group");
// mutations
const MutationsUser = require("./mutations/User");
const MutationsGroup = require("./mutations/Group");

const resolvers = {
  Query: {
    ...QueriesUser,
    ...QueriesGroup,
  },

  Mutation: {
    ...MutationsUser,
    ...MutationsGroup,
  },
};

module.exports = { resolvers };
