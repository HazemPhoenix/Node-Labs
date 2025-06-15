const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtVerify = promisify(jwt.verify);

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const decodedPayload = await jwtVerify(token, PRIVATE_KEY);
    req.user = {
      id: decodedPayload.id,
      role: decodedPayload.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
