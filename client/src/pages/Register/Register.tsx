import { Container, Loader } from "../../components";
import ProfileImage from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "preact/hooks";
import convertToBase64 from "../../helpers/convert";
import React from "preact/compat";
import { registerValidation } from "../../helpers/validate";
import { REGISTER_REQUIREMENT } from "../../datas/general.ts";
import { registerUser } from "../../helpers/fetch.ts";
import { AxiosError, AxiosResponse } from "axios";
import { IGeneralResponse } from "../../types/fetching.ts";
import toast from "react-hot-toast";
import { STATUS_SUCCESS } from "../../datas/variables.ts";

const Register = () => {
  const [inputType, setInputType] = useState("password");
  const [file, setFile] = useState<File | any>();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      profile: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      setLoading(true);
      try {
        const response: AxiosResponse<IGeneralResponse> = await registerUser(
          values,
        );

        const { status, message } = response.data;
        if (status === STATUS_SUCCESS) {
          toast.success(message);
        }
      } catch (err) {
        const errResponse = err as AxiosError<IGeneralResponse>;

        const messageLength = errResponse?.response?.data.message.length || 40;

        toast.error(errResponse?.response?.data?.message, {
          duration: messageLength * 60,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const isShown = (type: string) => {
    const field = formik.getFieldProps(type);
    return field.value ? field.value.length > 0 : false;
  };

  const changeTypeHandler = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const fieldResetHandler = (field: string) => {
    const handler = formik.getFieldHelpers(field);
    handler.setValue("");
  };

  // for handle file upload, cuz formik doesn't support file upload
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    const base64 = await convertToBase64(file);
    setFile(base64);
  };

  const renderButtonText = () => {
    if (loading) {
      return (
        <div className="flex gap-1 items-center justify-center">
          <Loader />
          <h1>Loading ...</h1>
        </div>
      );
    } else {
      return <>Register</>;
    }
  };

  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-14 max-w-sm text-center flex flex-col bg-white">
        <div className="w-full flex flex-col items-center gap-3 mb-8">
          <h1 className="text-3xl font-semibold">Register Page</h1>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            Register your account and enjoy our app
          </p>
        </div>

        <div className="mb-3">
          <label
            for="profile"
            className="flex items-center justify-center hover:cursor-pointer"
          >
            <img
              alt="profile image"
              src={file || ProfileImage}
              className="w-2/4 overflow-hidden rounded-full border-2 border-white shadow-md"
            />
          </label>

          <input
            onChange={onUpload}
            type="file"
            id="profile"
            name="profile"
            className="hidden"
            accept="image/*"
          />
          <small className="text-xs italic">
            *You can change profile photo
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative w-full flex flex-col rounded-md overflow-hidden">
            <input
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="Email"
              className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                isShown("email") ? "pr-12 border-slate-300" : "pr-3"
              }`}
            />
            {isShown("email") && (
              <button
                className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                onClick={() => {
                  fieldResetHandler("email");
                }}
              >
                clear
              </button>
            )}
          </div>

          <div className="relative w-full flex flex-col rounded-md overflow-hidden">
            <input
              {...formik.getFieldProps("userName")}
              type="text"
              placeholder="Username"
              className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                isShown("userName") ? "pr-12 border-slate-300" : "pr-3"
              }`}
            />
            {isShown("userName") && (
              <button
                className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                onClick={() => {
                  fieldResetHandler("userName");
                }}
              >
                clear
              </button>
            )}
          </div>

          <div className="relative w-full flex flex-col rounded-md overflow-hidden">
            <input
              {...formik.getFieldProps("password")}
              type={inputType}
              placeholder="Password"
              className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                isShown("password") ? "pr-12 border-slate-300" : "pr-3"
              }`}
            />
            {isShown("password") && (
              <button
                className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                onClick={changeTypeHandler}
              >
                {inputType === "password" ? "show" : "hide"}
              </button>
            )}
          </div>
          <ul className="text-left list-disc list-inside decoration-green-300">
            {REGISTER_REQUIREMENT.password.map((item, index) => (
              <li key={index} className="text-[12px]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-emerald-400 rounded-md py-2 text-sm mt-3 transition-all duration-150 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          disabled={loading}
        >
          {renderButtonText()}
        </button>

        <div className="mb-4 mt-5">
          <p className="text-xs">
            Already have an account?{" "}
            <Link to="/" className="font-semibold">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;
