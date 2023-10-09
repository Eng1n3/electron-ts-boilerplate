export type GResponse<T> = {
  message: string;
  data: T;
};

export type CResponse<T> = {
  count: number;
  data: T[];
};
