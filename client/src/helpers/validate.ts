import toast from "react-hot-toast";

type props = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  username?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  confirm_password?: string | undefined;
  exist?: string | undefined;
};

// ========== VALIDATOR ========== //

/** validate login page username */
export async function usernameValidate(values: props) {
  const errors = usernameVerify({}, values);

  return errors;
}

/** validate password */
export async function passwordValidate(values: props) {
  const errors = passwordVerify({}, values);

  return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values: props) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_password) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

/** validate register form */
export async function registerValidation(values: props) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

// ========== FUNCTION ========== //

/** validate username */
function usernameVerify(error: props = {}, values: props) {
  if (!values?.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }

  return error;
}

/** validate password */
function passwordVerify(errors: props = {}, values: props) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character");
  }

  return errors;
}

/** validate email */
function emailVerify(error: props = {}, values: props) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}
