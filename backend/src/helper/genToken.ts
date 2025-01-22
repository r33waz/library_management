import jwt from "jsonwebtoken";

interface TokenOptions {
  expiresIn: string;
}

const accessToken = process.env.ACCESS_TOKEN;
const refreshToken = process.env.REFRESH_TOKEN;

if (!accessToken || !refreshToken) {
  console.log("ACCESS_TOKEN environment variable is not set");
  throw new Error("ACCESS_TOKEN environment variable is not set");
}

export const genAccessToken = (payload: Object, options: TokenOptions) => {
  const { expiresIn } = options;
  const token = jwt.sign(payload, accessToken, {
    expiresIn: expiresIn || "1h",
    algorithm: "HS256",
  });

  return token;
};

export const genRefreshToken = (payload: Object, options: TokenOptions) => {
  const { expiresIn } = options;
  const token = jwt.sign(payload, refreshToken, {
    expiresIn: expiresIn || "7d",
  });

  return token;
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
