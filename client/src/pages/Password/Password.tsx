import { useFormik } from "formik";
import { useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import ProfileImage from "../../assets/profile.png";
import { BackButton, Container, FormButton } from "../../components";
import { useAuthStore } from "@/store/store.ts";
import toast from "react-hot-toast";
import { verifyPassword } from "@/helpers/fetch.ts";
import { AxiosError, AxiosResponse } from "axios";
import {
  ILoginErrorResponse,
  ILoginSuccessResponse,
} from "@/types/fetch.type.ts";
// @ts-ignore
import { JSXInternal } from "preact/src/jsx";
import { InputPassword } from "@/components";
import useGetUserDetail from "@/hooks/useGetUserDetail.tsx";

const Password = () => {
  const [loading, setLoading] = useState(false);

  const { auth } = useAuthStore();

  const USER = useGetUserDetail(auth.userName);

  const navigate = useNavigate();

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

        toast.success("Success Login");

        const { token } = response.data;
        await localStorage.setItem("token", token);
        navigate("/profile");
      } catch (err) {
        const errResponse = err as AxiosError<ILoginErrorResponse>;
        const message = errResponse?.response?.data.message;
        const messageLength = message?.length || 40;
        toast.error(message, {
          duration: messageLength * 100,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const buttonHandler = (
    e: JSXInternal.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Container>
      <BackButton />
      <div className="shadow-md rounded-xl px-12 py-14 max-w-sm text-center flex flex-col bg-white">
        <div className="w-full flex flex-col items-center gap-2 mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Welcome Back</h1>
            <h1 className="text-2xl font-medium">{USER.userName}</h1>
          </div>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            And now please enter your password to get in
          </p>
        </div>

        <div className="w-full text-center flex items-center justify-center mb-8">
          <img
            alt="profile image"
            src={USER.profile || ProfileImage}
            className="w-2/4 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <InputPassword formik={formik} />

        <FormButton onClick={buttonHandler} text="Sign In" loading={loading} />

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
