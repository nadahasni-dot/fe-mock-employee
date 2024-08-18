export type CommonResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T | null;
};
