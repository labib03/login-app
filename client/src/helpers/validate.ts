import toast from "react-hot-toast";
import { authenticate } from "./fetch.ts";
import { isAxiosError } from "axios";
import { UpdateUserProps } from "../types/fetching.ts";

type props = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  userName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  confirm_password?: string | undefined;
  exist?: string | undefined;
  profile?: string | undefined;
};

// ========== VALIDATOR ========== //

/** validate login page username */
export async function usernameValidate(values: props) {
  const userName = usernameVerify(values);

  if (values.userName) {
    try {
      await authenticate(values.userName);
    } catch (error) {
      if (isAxiosError(error)) {
        return { userName: error?.response?.data.message };
      }
    }
    // check user exist or not
  }

  return { userName };
}

/** validate password */
export async function passwordValidate(values: props) {
  const password = passwordVerify(values);
  return { password };
}

/** validate reset password */
export async function resetPasswordValidation(values: props) {
  const password = passwordVerify(values);

  if (values.password !== values.confirm_password) {
    return toast.error("Password not match...!");
  }

  return { password };
}

/** validate register form */
export async function registerValidation(values: {
  email: string;
  userName: string;
  password: string;
  profile: string;
}) {
  const email = emailVerify(values);
  const userName = usernameVerify(values);
  const password = passwordVerify(values);

  return {
    email,
    userName,
    password,
  };
}

export function updateUserValidation(payload: UpdateUserProps) {
  const userName = usernameVerify(payload);
  const email = emailVerify(payload);

  return { userName, email };

  // console.log("errors email", errorsEmail);
  // if (!payload.userName) {
  //   toast.error("Username is required");
  //   return {
  //     userName: "Username is required",
  //     email: "",
  //   };
  // }
  //
  // if (!payload.email) {
  //   toast.error("email is required");
  //   return {
  //     email: "email is required",
  //     userName: "",
  //   };
  // }
}

// ========== FUNCTION ========== //

/** validate username */
function usernameVerify(values: props) {
  if (!values?.userName) {
    return "Username Required...!";
  } else if (values?.userName?.includes(" ")) {
    return "Invalid Username...!";
  }
}

/** validate password */
function passwordVerify(values: props) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    return "Password Required...!";
  } else if (values.password.includes(" ")) {
    return "Invalid Password...!";
  } else if (values.password.length < 4) {
    return "Password must be more than 4 characters long";
  } else if (!specialChars.test(values.password)) {
    return "Password must have special character";
  }
}

/** validate email */
function emailVerify(values: props) {
  if (!values.email) {
    return "Email Required...!";
  } else if (values.email.includes(" ")) {
    return "Wrong Email...!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    return "Invalid email address...!";
  }
}
