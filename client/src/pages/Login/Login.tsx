import { Container } from "../../components";
import ProfileImage from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { usernameValidate } from "../../helpers/validate";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const isHasValue = formik?.values?.username?.length
    ? formik?.values?.username?.length > 0
    : false;

  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-6 max-w-sm text-center flex flex-col gap-5 bg-white">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            Hey, enter your username to get sign in to your account
          </p>
        </div>

        <div className="w-full text-center flex items-center justify-center">
          <img
            src={ProfileImage}
            className="w-2/3 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <div className="relative w-full flex flex-col gap-3 rounded-md overflow-hidden">
          <input
            {...formik.getFieldProps("username")}
            type="text"
            placeholder="Username"
            className={`border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
              isHasValue ? "pr-12 border-slate-300" : "pr-3"
            }`}
          />
          {isHasValue && (
            <button
              className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md"
              onClick={formik.handleReset}
            >
              clear
            </button>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          className="bg-emerald-400 rounded-md py-2 text-sm transition-all duration-150 hover:bg-emerald-500"
        >
          Continue
        </button>

        <div className="mb-4">
          <p className="text-xs">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
