type DataResponse = {
  _id: string;
  username: string;
  email: string;
  profile: string;
  __v: number;
};

export type UpdateUserProps = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  userName?: string;
  email?: string;
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

export interface IGeneralResponse {
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

export interface IUpdateUserErrorResponse {
  status: string;
  message: string;
  error: any;
}

export interface IRegisterUserErrorResponse {
  status: string;
  message: string;
  error: any;
}
