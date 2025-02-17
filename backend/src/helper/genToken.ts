import jwt from "jsonwebtoken";
interface TokenOptions {
  expiresIn?: string;
}

const accessToken = process.env.ACCESS_TOKEN;
const refreshToken = process.env.REFRESH_TOKEN;

if (!accessToken || !refreshToken) {
  console.log("ACCESS_TOKEN environment variable is not set");
  throw new Error("ACCESS_TOKEN environment variable is not set");
}

export const genAccessToken = (payload: Object) => {
  const token = jwt.sign(payload, accessToken, {
    expiresIn: "1h",
  });

  return token;
};

export const genRefreshToken = (payload: Object) => {
  const token = jwt.sign(payload, refreshToken, {
    expiresIn: "7d",
  });

  return token;
};

export const verifyToken = (token: string, secret: string | undefined) => {
  if (!secret) {
    throw new Error("SECRET_KEY is not defined in the environment");
  }
  return jwt.verify(token, secret);
};
