import { useFormik } from "formik";
import { useState } from "preact/hooks";
import { Link } from "react-router-dom";
import ProfileImage from "../../assets/profile.png";
import { BackButton, Container } from "../../components";
import { passwordValidate } from "../../helpers/validate";

const Password = () => {
  const [inputType, setInputType] = useState("password");
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const isHasValue = formik?.values?.password?.length
    ? formik?.values?.password?.length > 0
    : false;

  const changeTypeHandler = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-14 max-w-sm text-center flex flex-col bg-white">
        <BackButton />

        <div className="w-full flex flex-col items-center gap-2 mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Welcome Back</h1>
            <h1 className="text-2xl font-medium">Username</h1>
          </div>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            And now please enter your password to get in
          </p>
        </div>

        <div className="w-full text-center flex items-center justify-center mb-8">
          <img
            src={ProfileImage}
            className="w-2/4 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <div className="relative w-full flex flex-col rounded-md overflow-hidden">
          <input
            {...formik.getFieldProps("password")}
            type={inputType}
            placeholder="Password"
            className={`border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
              isHasValue ? "pr-12 border-slate-300" : "pr-3"
            }`}
          />
          {isHasValue && (
            <button
              className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md"
              onClick={changeTypeHandler}
            >
              {inputType === "password" ? "show" : "hide"}
            </button>
          )}
        </div>

        <button
          className="bg-emerald-400 rounded-md py-2 text-sm mt-2 transition-all duration-150 hover:bg-emerald-500"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          Sign In
        </button>

        <div className="mb-4 mt-5">
          <p className="text-xs">
            Forget your password?{" "}
            <Link to="/recover" className="font-semibold">
              Recover Now
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Password;
