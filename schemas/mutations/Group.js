const { Groups } = require("../../models/index");

const Mutations = {
  async createGroup(parent, args, ctx, info) {
    console.log(ctx);
    if (!ctx.verified) {
      throw new Error("Unauthorized!");
    }

    if (ctx.verified.role !== "ADMIN") {
      throw new Error("You do not have permission");
    }

    const { name } = args.input;
    console.log(args);

    const groupSaved = await Groups.create({ name });
    return groupSaved;
  },

  async updateGroup(parent, args, ctx, info) {
    console.log(ctx);
    if (!ctx.verified) {
      throw new Error("Unauthorized!");
    }

    if (ctx.verified.role !== "ADMIN") {
      throw new Error("You do not have permission");
    }

    const { name } = args.input;
    const { id } = args;
    console.log(args);

    const groupUpdated = await Groups.update({ name }, { where: { id } });
    return groupUpdated;
  },

  async deleteGroup(parent, args, ctx, info) {
    console.log(ctx);
    if (!ctx.verified) {
      throw new Error("Unauthorized!");
    }

    if (ctx.verified.role !== "ADMIN") {
      throw new Error("You do not have permission");
    }
    const { id } = args;
    console.log(args);

    await Groups.destroy({ where: { id } });
    return "group deleted successfully";
  },
};

module.exports = Mutations;
