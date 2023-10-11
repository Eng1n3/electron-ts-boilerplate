const handleError = (error) => {
  console.log(error);
  if (error?.status === 400) {
    const { message: _message, ...data } = error;
    return {
      statusCode: error.status,
      message: error.message,
      data: data ? Object.values(data) : undefined,
    };
  }
  return {
    statusCode: 500,
    message: "internal server error",
  };
};

export default handleError;
