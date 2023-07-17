type DataResponse = {
  _id: string;
  username: string;
  email: string;
  profile: string;
  __v: number;
};

export type UserDetailType = {
  _id: string;
  userName: string;
  email: string;
  profile: string;
  __v: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type UpdateUserProps = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  userName?: string;
  email?: string;
  profile?: string;
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

export interface IDetailUserResponse {
  data: UserDetailType;
  status: string;
  message: string;
}
