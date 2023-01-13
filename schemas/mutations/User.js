const { Users, Roles, Groups, UsersGroups } = require("./../../models/index");
const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JWT_SECRET";

const Mutations = {
  async createUser(parent, args, ctx, info) {
    const { password, username, role, ...rest } = args.input;
    console.log(args);

    const roleFound = await Roles.findOne({ where: { name: role } });
    if (!roleFound) {
      throw new Error("Role not found");
    }

    const userFound = await Users.findOne({ where: { username } });
    if (userFound) {
      throw new Error("User already exist");
    }

    const passwordHash = await hash(password);

    const userSaved = await Users.create({
      ...rest,
      username,
      RoleId: roleFound.id,
      password: passwordHash,
    });
    return userSaved;
  },

  async loginUser(parent, args, ctx, info) {
    const { username, password } = args.input;
    console.log(args);

    const userFound = await Users.findOne({
      where: { username },
      include: Roles,
    });
    if (!userFound) {
      throw new Error("No user found");
    }

    // password correct
    const passwordCorrect = await verify(userFound.password, password);
    if (!passwordCorrect) {
      throw new Error("Incorrect password");
    }
    // create token
    const token = await jwt.sign(
      {
        id: userFound.id,
        username: userFound.username,
        role: userFound.Role.name,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  },

  async changePassword(parent, args, ctx, info) {
    console.log(ctx);
    if (!ctx.verified) {
      throw new Error("Unauthorized!");
    }

    const userFound = await Users.findOne({ where: { id: ctx.verified.id } });
    if (!userFound) {
      throw new Error("No user found");
    }

    const passwordCorrect = await verify(userFound.password, oldPassword);
    if (!passwordCorrect) {
      throw new Error("Incorrect password");
    }
    const passwordHash = await hash(newPassword);

    const userUpdated = await Users.update(
      { password: passwordHash },
      { where: { id: userFound.id } }
    );
    return userUpdated;
  },

  // join group with user authenticated
  async joinGroup(parent, args, ctx, info) {
    console.log(ctx);
    if (!ctx.verified) {
      throw new Error("Unauthorized!");
    }

    const { GroupId } = args.input;
    console.log(args);

    const groupFound = await Groups.findByPk(GroupId);
    if (!groupFound) {
      throw new Error("No group found");
    }

    await UsersGroups.create({
      UserId: ctx.verified.id,
      GroupId,
    });
    return "join group successfully";
  },
};

module.exports = Mutations;
