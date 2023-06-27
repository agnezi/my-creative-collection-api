export const jwtConstants = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  userDataTokenSecret: process.env.USER_DATA_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
};
