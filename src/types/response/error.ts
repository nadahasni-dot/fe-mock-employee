export type ErrorItem = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export type ErrorResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data?: T | null;
  errors?: ErrorItem[];
};
