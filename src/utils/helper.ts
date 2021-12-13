export const getErrorMessage = (e: any) => {
  let message = e;

  if (e instanceof Error) {
    message = e.message;
  }

  return message;
};
