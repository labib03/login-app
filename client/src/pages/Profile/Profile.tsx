import { useFormik } from "formik";
import React from "preact/compat";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../assets/profile.png";
import { Container, FormButton } from "../../components";
import convertToBase64 from "@/helpers/convert.ts";
import { updateUser } from "@/helpers/fetch.ts";
import { AxiosError, AxiosResponse } from "axios";
import {
  IGeneralResponse,
  IUpdateUserErrorResponse,
} from "@/types/fetch.type.ts";
import toast from "react-hot-toast";
import { updateUserValidation } from "@/helpers/validate.ts";
// @ts-ignore
import { JSXInternal } from "preact/src/jsx";
import useGetUserDetail from "@/hooks/useGetUserDetail.tsx";
import { InputNumber, InputText } from "@/components";

const initialStateFieldError = {
  userName: false,
  email: false,
};

const Profile = () => {
  const [file, setFile] = useState<File | any>();
  const [fieldError, setFieldError] = useState(initialStateFieldError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const users = useGetUserDetail();

  const formik = useFormik({
    initialValues: {
      firstName: users?.firstName,
      lastName: users?.lastName,
      email: users?.email,
      userName: users?.userName,
      phoneNumber: users?.phoneNumber,
    },
    enableReinitialize: true,
    validate: updateUserValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = { ...values, profile: file || users?.profile || "" };
      setLoading(true);
      setFieldError(initialStateFieldError);

      try {
        const response: AxiosResponse<IGeneralResponse> = await updateUser(
          values,
        );
        const { message } = response.data;
        const duration = message.length * 60;

        toast.success(message, {
          duration,
        });
      } catch (err) {
        const errResponse = err as AxiosError<IUpdateUserErrorResponse>;
        const message = errResponse?.response?.data.message;
        const duration = message ? message.length * 100 : 2000;

        const fieldError = errResponse?.response?.data?.error?.field;
        setFieldError((val) => ({
          ...val,
          [fieldError.join()]: true,
        }));

        toast.error(message, {
          duration,
        });
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

  const logoutHandler = async () => {
    await localStorage.removeItem("token");

    navigate("/");
  };

  const buttonHandler = (
    e: JSXInternal.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-14 max-w-md text-center flex flex-col bg-white">
        <div className="w-full flex flex-col items-center gap-3 mb-8">
          <h1 className="text-3xl font-semibold">Profile Page</h1>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            Detail of your account
          </p>
        </div>

        <div className="mb-3">
          <label
            for="profile"
            className="flex items-center justify-center hover:cursor-pointer"
          >
            <img
              alt="profile image"
              src={file || users?.profile || ProfileImage}
              className="w-2/5 overflow-hidden rounded-full border-2 border-white shadow-md"
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

        <div className="flex flex-col gap-5 mb-4">
          <div className="flex gap-1">
            <InputText
              formik={formik}
              field="firstName"
              placeholder="First Name"
            />

            <InputText
              formik={formik}
              field="lastName"
              placeholder="Last Name"
            />
          </div>

          <div className="flex gap-1">
            <div className="relative w-full">
              <InputNumber formik={formik} />
            </div>

            <div className="w-full">
              <InputText
                formik={formik}
                field={"userName"}
                placeholder={"User Name"}
              />
              {fieldError.userName && (
                <small className="w-full flex items-center justify-start text-xs text-red-500">
                  username already used
                </small>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col overflow-hidden">
            <InputText
              formik={formik}
              field={"email"}
              placeholder={"Email Address"}
            />
            {fieldError.email && (
              <small className="w-full flex items-center justify-start text-xs text-red-500">
                email already used
              </small>
            )}
          </div>
        </div>

        <FormButton onClick={buttonHandler} text={"Update"} loading={loading} />

        <div className="mb-4 mt-5">
          <p className="text-xs">
            Want to leave ?{" "}
            <button
              className="text-red-500 font-semibold"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
