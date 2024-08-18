export type CommonResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T | null;
};

export type CommonListResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T | null;
  meta: {
    page: number;
    perPage: number;
    totalPage: number;
  };
};
