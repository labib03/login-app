import { useFormik } from "formik";
import ProfileImage from "../../assets/profile.png";
import { BackButton, Container } from "../../components";
import { resetPasswordValidation } from "@/helpers/validate.ts";
import { FormButton, InputPassword } from "@/components";
import { useAuthStore } from "@/store/store.ts";
import { useState } from "preact/hooks";
import useGetUserDetail from "@/hooks/useGetUserDetail.tsx";
import { AxiosError, AxiosResponse } from "axios";
import { IGeneralResponse } from "@/types/fetching.ts";
import { resetPassword } from "@/helpers/fetch.ts";
import toast from "react-hot-toast";
import { wait } from "@/helpers/general.ts";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    auth: { userName },
  } = useAuthStore();
  const USER = useGetUserDetail(userName);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<IGeneralResponse> = await resetPassword({
          id: USER._id,
          password: values.password,
        });

        const message = response.data.message;
        const duration = message.length * 100;

        toast.success(message, {
          duration,
        });
        wait(10).then(() => {
          navigate("/");
        });
      } catch (err) {
        const errResponse = err as AxiosError<IGeneralResponse>;
        toast.error(errResponse.response?.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isDisabled = !formik?.values?.password?.length;

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
            alt={"profile image"}
            src={ProfileImage}
            className="w-2/4 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <InputPassword formik={formik} withValidation={true} />

        <InputPassword
          formik={formik}
          formikField={"confirm_password"}
          isDisabled={isDisabled}
          placeholder={"Confirm Password"}
          withValidation={true}
        />

        <FormButton
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          text={"Reset Password"}
          loading={isLoading}
        />
      </div>
    </Container>
  );
};

export default Reset;
