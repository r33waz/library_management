import jwt from "jsonwebtoken";

export const genAccessToken = (payload: Object) => {
  if (!process.env.ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN environment variable is not set");
  }
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });

  return token;
};

export const genRefreshToken = (payload: Object) => {
  if (!process.env.REFRESH_TOKEN) {
    throw new Error("REFRESH_TOKEN environment variable is not set");
  }
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return token;
};
