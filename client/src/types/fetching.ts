type DataResponse = {
  _id: string;
  username: string;
  email: string;
  profile: string;
  __v: number;
};

export interface ResponseFetchType {
  status: string;
  message: string;
  username?: string;
  token?: string;
  data?: DataResponse;
  code: string;
  email?: string;
}

export interface ICollectionResponse<T> {
  data: T;
}

export interface IRegisterResponse {
  status: string;
  message: string;
}

export interface ILoginSuccessResponse {
  status: string;
  message: string;
  username: string;
  token: string;
}

export interface ILoginErrorResponse {
  status: string;
  message: string;
}
