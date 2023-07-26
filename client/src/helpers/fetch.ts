import axios, { AxiosInstance } from "axios";
import { UpdateUserProps } from "../types/fetching.ts";
import { BASE_URL } from "../datas/variables.ts";
import jwtDecode from "jwt-decode";
import { UserToken } from "@/types/general.ts";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/** authenticate function */
export async function authenticate(userName: string) {
  return await api.post("/api/authenticate", {
    userName,
  });
}

/** To get username from Token */
export function getUsernameFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return "Cannot find Token";
  const { userName } = jwtDecode<UserToken>(token);
  return userName;
}

/** get User details */
export async function getUser(userName: string) {
  return await api.get(`/api/user/${userName}`);
}

/** register user function */
export async function registerUser(credentials: {
  userName: string;
  email: string;
  profile: string;
}) {
  return await api.post("/api/register", credentials);
  // try {
  //   const { data, status }: ResponseProps = await api.post(
  //     `/api/register`,
  //     credentials,
  //   );
  //
  //   let { username, email } = credentials;
  //   const { message } = data;
  //
  //   /** send email */
  //   if (status === 201) {
  //     await api.post("/api/registerMail", {
  //       username,
  //       userEmail: email,
  //       text: message,
  //     });
  //   }
  //
  //   return data;
  // } catch (error) {
  //   return error as AxiosError;
  // }
}

/** login function */
export async function verifyPassword({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) {
  return await api.post("/api/login", { userName, password });
}

/** update user profile function */
export async function updateUser(payload: UpdateUserProps) {
  const token = await localStorage.getItem("token");
  return await api.put("/api/updateUser", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/** generate OTP */
export async function generateOTP({ userName }: { userName: string }) {
  return await api.post("/api/generateOTP", { userName });
}

/** verify OTP */
export async function verifyOTP({
  userName,
  code,
}: {
  userName: string;
  code: string;
}) {
  return await api.get("/api/verifyOTP", {
    params: { userName: userName, code: code },
  });
}

/** reset password */
export async function resetPassword({
  id,
  password,
}: {
  id: string;
  password: string;
}) {
  return await api.put("/api/resetPassword", { id, password });
}
