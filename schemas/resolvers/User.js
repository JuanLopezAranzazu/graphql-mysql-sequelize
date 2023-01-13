const { Users, Roles, Groups } = require("./../../models/index");

const Queries = {
  async findAllUsers(parent, args, ctx, info) {
    const users = await Users.findAll({ include: [Roles, Groups] });
    return users;
  },

  async findOneUser(parent, args, ctx, info) {
    const { id } = args;
    console.log(args);
    const user = await Users.findByPk(id, { include: [Roles, Groups] });
    return user;
  },

  async groupsByUser(parent, args, ctx, info) {
    console.log(ctx);
    if (!ctx.verified) {
      throw new Error("Unauthorized!");
    }

    const user = await Users.findByPk(ctx.verified.id, {
      include: Groups,
    });
    return user.Groups;
  },
};

module.exports = Queries;
