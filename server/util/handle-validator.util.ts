import { validateOrReject } from "class-validator";
import createError from "http-errors";

const createInstance = <T>(target, source: T): T => {
  for (const [key, value] of Object.entries(target)) {
    source[key] = value;
  }
  return source as T;
};

const handleValidator = async <T>(values, source: T) => {
  try {
    const value = createInstance(values, source);
    await validateOrReject(value as object);
  } catch (error) {
    throw createError(400, error);
  }
};

export default handleValidator;
