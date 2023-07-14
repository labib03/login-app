import axios, { AxiosInstance } from "axios";
import { ResponseFetchType, UpdateUserProps } from "../types/fetching.ts";
import { BASE_URL } from "../datas/variables.ts";

type ResponseProps = {
  data: ResponseFetchType;
  status?: number;
};

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

/** get User details */
export async function getUser({ username }: { username: string }) {
  try {
    const { data } = await api.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
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
export async function updateUser(response: UpdateUserProps) {
  const token = await localStorage.getItem("token");
  return await api.put("/api/updateUser", response, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/** generate OTP */
export async function generateOTP(username: string) {
  try {
    const { data: dataOTP, status }: ResponseProps = await api.get(
      "/api/generateOTP",
      { params: { username } },
    );

    const { code } = dataOTP;

    // send mail with the OTP
    if (status === 201) {
      let { data } = await getUser({ username });

      const { email } = data;

      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await api.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({
  username,
  code,
}: {
  username: string;
  code: string;
}) {
  try {
    const { data, status }: ResponseProps = await api.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const { data, status }: ResponseProps = await api.put(
      "/api/resetPassword",
      { username, password },
    );
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
