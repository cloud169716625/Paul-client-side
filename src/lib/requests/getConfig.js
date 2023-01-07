export const getConfig = ({ module, action, xForwardedFor }) => {
  const config = {
    headers: {
      modulename: module,
      moduleactionname: action,
      'X-Forwarded-For': xForwardedFor,
    },
  };
  return config;
};
