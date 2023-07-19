import { Container } from "../../components";
import ProfileImage from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "preact/hooks";
import convertToBase64 from "../../helpers/convert";
import React from "preact/compat";
import { registerValidation } from "@/helpers/validate.ts";
import { REGISTER_REQUIREMENT } from "@/datas/general.ts";
import { registerUser } from "@/helpers/fetch.ts";
import { AxiosError, AxiosResponse } from "axios";
import {
  IGeneralResponse,
  IRegisterUserErrorResponse,
} from "@/types/fetching.ts";
import toast from "react-hot-toast";
import { BackButton, FormButton, InputPassword, InputText } from "@/components";

const initialStateFieldError = {
  userName: false,
  email: false,
};
const Register = () => {
  const [file, setFile] = useState<File | any>();
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState(initialStateFieldError);

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
      setFieldError(initialStateFieldError);

      try {
        const response: AxiosResponse<IGeneralResponse> = await registerUser(
          values,
        );
        const { message } = response.data;
        toast.success(message);
      } catch (err) {
        const errResponse = err as AxiosError<IRegisterUserErrorResponse>;

        const message = errResponse?.response?.data.message;
        console.log("message", message);
        const duration = message ? message.length * 100 : 2000;
        const fieldError = errResponse?.response?.data?.error?.field;
        toast.error(message, {
          duration,
        });

        setFieldError((val) => ({
          ...val,
          [fieldError.join()]: true,
        }));
      } finally {
        setLoading(false);
      }
    },
  });

  // for handle file upload, cuz formik doesn't support file upload
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    const base64 = await convertToBase64(file);
    setFile(base64);
  };

  const buttonHandler = (
    e: React.JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Container>
      <BackButton />
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
          <InputText
            formik={formik}
            field={"email"}
            placeholder={"Email Address"}
          />

          <InputText
            formik={formik}
            field={"userName"}
            placeholder={"User Name"}
          />

          <div>
            <InputPassword formik={formik} withValidation />
            <ul className="text-left list-disc list-inside decoration-green-300">
              {REGISTER_REQUIREMENT.password.map((item, index) => (
                <li key={index} className="text-[12px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FormButton
          onClick={buttonHandler}
          text={"Register"}
          loading={loading}
        />

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
