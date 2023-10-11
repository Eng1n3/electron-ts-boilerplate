const handleError = (error) => {
  console.log(error);
  if (error?.status === 400) {
    console.log({ error });
    return {
      statusCode: error.status,
      message: error.message,
    };
  }
  return {
    statusCode: 500,
    message: "internal server error",
  };
};

export default handleError;
