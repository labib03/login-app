import { useFormik } from "formik";
import React from "preact/compat";
import { useState } from "preact/hooks";
import { Link } from "react-router-dom";
import ProfileImage from "../../assets/profile.png";
import { Container } from "../../components";
import convertToBase64 from "../../helpers/convert";

const Profile = () => {
  const [file, setFile] = useState<File | any>();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      phoneNumber: "",
    },
    // validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
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

                  const value = inputElement.value.slice(0, 12);
                  handler.setValue(value);
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

            <div className="relative w-full rounded-md overflow-hidden">
              <input
                {...formik.getFieldProps("userName")}
                type="text"
                placeholder="User Name"
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
          </div>

          <div className="relative w-full flex flex-col rounded-md overflow-hidden">
            <input
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="Email Address"
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
        </div>

        <button
          type="submit"
          className="bg-emerald-400 rounded-md py-2 text-sm mt-3 transition-all duration-150 hover:bg-emerald-500"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          Update
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