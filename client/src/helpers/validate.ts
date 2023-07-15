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
  const errors = usernameVerify(values);

  if (values.userName) {
    try {
      await authenticate(values.userName);
    } catch (error) {
      if (isAxiosError(error)) {
        const messageLength = error?.response?.data.message.length;
        return toast.error(error?.response?.data.message, {
          duration: messageLength * 100,
        });
      }
    }
    // check user exist or not
  }

  return errors;
}

/** validate password */
export async function passwordValidate(values: props) {
  return passwordVerify(values);
}

/** validate reset password */
export async function resetPasswordValidation(values: props) {
  const errors = passwordVerify(values);

  if (values.password !== values.confirm_password) {
    return toast.error("Password not match...!");
  }

  return errors;
}

/** validate register form */
export async function registerValidation(values: {
  email: string;
  userName: string;
  password: string;
  profile: string;
}) {
  if (!values.email) {
    return toast.error("Email is required");
  }
  emailVerify(values);

  if (!values.userName) {
    return toast.error("Username is required");
  }
  usernameVerify(values);

  if (!values.password) {
    return toast.error("Password is required");
  }
  passwordVerify(values);
}

export function updateUserValidation(payload: UpdateUserProps) {
  if (!payload.userName) {
    return toast.error("Username is required");
  }
  usernameVerify(payload);

  if (!payload.email) {
    return toast.error("email is required");
  }
  emailVerify(payload);

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
    return toast.error("Username Required...!");
  } else if (values?.userName?.includes(" ")) {
    return toast.error("Invalid Username...!");
  }
}

/** validate password */
function passwordVerify(values: props) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    return toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    return toast.error("Invalid Password...!");
  } else if (values.password.length < 4) {
    return toast.error("Password must be more than 4 characters long");
  } else if (!specialChars.test(values.password)) {
    return toast.error("Password must have special character");
  }
}

/** validate email */
function emailVerify(values: props) {
  if (!values.email) {
    return toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    return toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    return toast.error("Invalid email address...!");
  }
}
