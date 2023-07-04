import { useFormik } from "formik";
import { useState } from "preact/hooks";
import ProfileImage from "../../assets/profile.png";
import { BackButton, Container } from "../../components";
import { resetPasswordValidation } from "../../helpers/validate";

const Reset = () => {
  const [inputType, setInputType] = useState("password");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const isHasValue = formik?.values?.password?.length
    ? formik?.values?.password?.length > 0
    : false;

  const isDisabled = formik?.values?.password?.length ? false : true;

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
          <h1 className="text-3xl font-semibold">Reset Password</h1>

          <p className="text-gray-400 text-xs max-w-[16rem]">
            Enter new password
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
            placeholder="New Password"
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

        <div className="relative w-full flex flex-col rounded-md overflow-hidden mt-2">
          <input
            {...formik.getFieldProps("confirm_password")}
            type={inputType}
            disabled={isDisabled}
            placeholder="Confirm Password"
            className={`border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0 disabled:bg-stone-100 disabled:cursor-not-allowed ${
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
          className="bg-emerald-400 rounded-md py-2 text-sm mt-3 mb-4 transition-all duration-150 hover:bg-emerald-500"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          Reset Password
        </button>
      </div>
    </Container>
  );
};

export default Reset;
