const { Groups, Users } = require("../../models/index");

const Queries = {
  async findAllGroups(parent, args, ctx, info) {
    const groups = await Groups.findAll({ include: Users });
    return groups;
  },

  async findOneGroup(parent, args, ctx, info) {
    const { id } = args;
    console.log(args);
    const group = await Groups.findByPk(id, { include: Users });
    return group;
  },
};

module.exports = Queries;
