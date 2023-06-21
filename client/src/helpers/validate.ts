import toast from "react-hot-toast";

type props = {
  username?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
};

/** validate login page username */
export async function usernameValidate(values: props) {
  const errors = usernameVerify({}, values);

  return errors;
}

/** validate username */
function usernameVerify(error: props = {}, values: props) {
  if (!values?.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }

  return error;
}
