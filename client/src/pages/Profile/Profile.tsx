import { useFormik } from "formik";
import React from "preact/compat";
import { useState } from "preact/hooks";
import { Link } from "react-router-dom";
import ProfileImage from "../../assets/profile.png";
import { Container, Loader } from "../../components";
import convertToBase64 from "../../helpers/convert";
import { updateUserValidation } from "../../helpers/validate.ts";
import { updateUser } from "../../helpers/fetch.ts";
import { AxiosError, AxiosResponse } from "axios";
import {
  IGeneralResponse,
  IUpdateUserErrorResponse,
} from "../../types/fetching.ts";
import toast from "react-hot-toast";

const initialStateFieldError = {
  userName: false,
  email: false,
};

const Profile = () => {
  const [file, setFile] = useState<File | any>();
  const [fieldError, setFieldError] = useState(initialStateFieldError);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      phoneNumber: "",
    },
    validate: updateUserValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
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
        const duration = message ? message.length * 60 : 2000;

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

  const isShown = (type: string) => {
    const field = formik.getFieldProps(type);
    return field.value ? String(field.value).length > 0 : false;
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
      return <>Update</>;
    }
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
              src={file || ProfileImage}
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

        <div className="flex flex-col gap-3">
          <div className="flex gap-1">
            <div className="relative w-full rounded-md overflow-hidden">
              <input
                {...formik.getFieldProps("firstName")}
                type="text"
                placeholder="First Name"
                className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                  isShown("firstName") ? "pr-12 border-slate-300" : "pr-3"
                }`}
              />
              {isShown("firstName") && (
                <button
                  className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                  onClick={() => {
                    fieldResetHandler("firstName");
                  }}
                >
                  clear
                </button>
              )}
            </div>

            <div className="relative w-full rounded-md overflow-hidden">
              <input
                {...formik.getFieldProps("lastName")}
                type="text"
                placeholder="Last Name"
                className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                  isShown("lastName") ? "pr-12 border-slate-300" : "pr-3"
                }`}
              />
              {isShown("lastName") && (
                <button
                  className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                  onClick={() => {
                    fieldResetHandler("lastName");
                  }}
                >
                  clear
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <div className="relative w-full rounded-md overflow-hidden">
              <input
                type="number"
                placeholder="Phone Number"
                value={formik.getFieldProps("phoneNumber").value}
                className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                  isShown("phoneNumber") ? "pr-12 border-slate-300" : "pr-3"
                }`}
                onChange={(event: Event) => {
                  const inputElement = event.target as HTMLInputElement;
                  const handler = formik.getFieldHelpers("phoneNumber");

                  const valueToString = inputElement.value.slice(0, 12);
                  handler.setValue(valueToString);
                }}
              />
              {isShown("phoneNumber") && (
                <button
                  className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                  onClick={() => {
                    fieldResetHandler("phoneNumber");
                  }}
                >
                  clear
                </button>
              )}
            </div>

            <div className="w-full rounded-md overflow-hidden">
              <div className="relative">
                <input
                  {...formik.getFieldProps("userName")}
                  type="text"
                  placeholder="User Name"
                  className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 placeholder:text-sm placeholder:text-center focus:border-slate-300 focus:placeholder:opacity-0  ${
                    isShown("userName") ? "pr-12 border-slate-300" : "pr-3"
                  } ${
                    fieldError.userName
                      ? "bg-red-100 placeholder:text-stone-800"
                      : ""
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
              {fieldError.userName && (
                <small className="w-full flex items-center justify-start text-xs text-red-500">
                  username already used
                </small>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col rounded-md overflow-hidden">
            <div className="relative">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="Email Address"
                className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0
                ${isShown("email") ? "pr-12 border-slate-300" : "pr-3"}
                ${fieldError.email ? "bg-red-200" : ""}
                `}
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
            {fieldError.email && (
              <small className="w-full flex items-center justify-start text-xs text-red-500">
                email already used
              </small>
            )}
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-emerald-400 rounded-md py-2 text-sm mt-3 transition-all duration-150 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {renderButtonText()}
        </button>

        <div className="mb-4 mt-5">
          <p className="text-xs">
            Want to leave ?{" "}
            <Link to="/" className="font-semibold text-red-500">
              Logout
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
