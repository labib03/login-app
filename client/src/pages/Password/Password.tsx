import { useFormik } from "formik";
import { useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import ProfileImage from "../../assets/profile.png";
import { BackButton, Container, Loader } from "../../components";
import useFetch from "../../hooks/useFetch.ts";
import { useAuthStore } from "../../store/store.ts";
import toast from "react-hot-toast";
import { verifyPassword } from "../../helpers/fetch.ts";
import { AxiosError, AxiosResponse } from "axios";
import {
  ILoginErrorResponse,
  ILoginSuccessResponse,
} from "../../types/fetching.ts";

const Password = () => {
  const [inputType, setInputType] = useState("password");
  const [loading, setLoading] = useState(false);

  const { auth } = useAuthStore();
  const responseUseFetch = useFetch(`/user/${auth.userName}`);
  const navigate = useNavigate();

  const { data } = responseUseFetch;

  const userData = data.apiData?.data;
  const errorServerResponse = data.serverError;

  if (errorServerResponse) {
    toast.error(errorServerResponse.message);
  }

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response: AxiosResponse<ILoginSuccessResponse> =
          await verifyPassword({
            userName: auth.userName,
            password: values.password,
          });

        const { token } = response.data;
        await localStorage.setItem("token", token);
        navigate("/profile");
      } catch (err) {
        const errResponse = err as AxiosError<ILoginErrorResponse>;
        const message = errResponse?.response?.data.message;
        const messageLength = message?.length || 40;
        toast.error(message, {
          duration: messageLength * 60,
        });
      } finally {
        setLoading(false);
      }
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

  const renderButtonText = () => {
    if (loading) {
      return (
        <div className="flex gap-1 items-center justify-center">
          <Loader />
          <h1>Loading ...</h1>
        </div>
      );
    } else {
      return <>Sign In</>;
    }
  };

  return (
    <Container>
      <BackButton />
      <div className="shadow-md rounded-xl px-12 py-14 max-w-sm text-center flex flex-col bg-white">
        <div className="w-full flex flex-col items-center gap-2 mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Welcome Back</h1>
            <h1 className="text-2xl font-medium">{userData?.username}</h1>
          </div>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            And now please enter your password to get in
          </p>
        </div>

        <div className="w-full text-center flex items-center justify-center mb-8">
          <img
            src={userData?.profile || ProfileImage}
            className="w-2/4 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <div className="relative w-full flex flex-col rounded-md overflow-hidden">
          <input
            {...formik.getFieldProps("password")}
            type={inputType}
            placeholder="Password"
            className={`border w-full border-slate-100 pl-3 rounded-md text-sm py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
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
          disabled={loading}
          className="bg-emerald-400 rounded-md py-2 text-sm mt-2 transition-all duration-150 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {renderButtonText()}
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
