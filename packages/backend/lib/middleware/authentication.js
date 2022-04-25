import JWT from "jsonwebtoken";
import * as AuroraDB from "../database";
import { AuthenticationError } from "../error";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyJwt = (accessToken) => {
  try {
    return JWT.verify(accessToken, JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError(401, "Invalid bearer token");
  }
};

export const authentication = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthenticationError(401, "No authorization header found");
  }

  const [type, accessToken] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new AuthenticationError(401, "Invalid authorization header");
  }

  const tokenPayload = verifyJwt(accessToken);

  const user = await AuroraDB.getUser(tokenPayload.data.id);

  if (!user) {
    throw new AuthenticationError();
  }

  // TODO: Remove sensitive informations like password
  req.user = user;
};
