export const getError = (error) => {
  const errorMsg = error?.response?.data?.exception || 'An Error Occured!!';
  return errorMsg;
};
