export const pagination = (page: number = 1, limit: number = 20) => {
  const validPage = page > 0 ? page : 1;
  const validLimit = limit > 0 ? limit : 20;
  return {
    limit: validLimit,
    page: validPage,
    skip: (validPage - 1) * validLimit,
  };
};
