const handleError = (error) => {
  if (error?.status === 400) {
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
