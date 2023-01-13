const { ApolloServer, AuthenticationError } = require("apollo-server");

const { typeDefs } = require("./schemas/typeDefs");
const { resolvers } = require("./schemas/resolvers");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "JWT_SECRET";

const verifyJwt = (jwtToken, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, secret, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let verified = null;
    if (!req.headers.authorization) return { verified };
    const values = req.headers.authorization.split(" ");

    try {
      verified = await verifyJwt(values[1], JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new AuthenticationError(`INVALID_TOKEN`);
    }
    return { verified };
  },
});

const db = require("./models/index");
const { Roles } = db;

const createRoles = async () => {
  try {
    const count = await Roles.count();
    if (count > 0) return;

    const rolesSaved = await Promise.all([
      Roles.create({ name: "ADMIN" }),
      Roles.create({ name: "USER" }),
    ]);
    console.log(rolesSaved);
  } catch (error) {
    console.error(error);
  }
};

db.sequelize.sync().then(() => {
  createRoles();
  server.listen().then(({ url }) => {
    console.log("SERVER RUNNING IN URL", url);
  });
});
