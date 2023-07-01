import { Container } from "../../components";
import ProfileImage from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "preact/hooks";

const Register = () => {
  const [inputType, setInputType] = useState("password");
  const [file, setFile] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    // validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
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
  const onUpload = async (e) => {
    const base64 = "";
    setFile(base64);
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
              src={ProfileImage}
              className="w-2/4 rounded-full border-2 border-white shadow-md"
            />
          </label>

          <input type="file" id="profile" name="profile" className="hidden" />
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
              className={`border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                isShown("email") ? "pr-12 border-slate-300" : "pr-3"
              }`}
            />
            {isShown("email") && (
              <button
                className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                onClick={() => {
                  fieldResetHandler("email");
                  const check = formik.getFieldProps("email");
                  console.log("check =>", check.value);
                }}
              >
                clear
              </button>
            )}
          </div>

          <div className="relative w-full flex flex-col rounded-md overflow-hidden">
            <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="Username"
              className={`border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
                isShown("username") ? "pr-12 border-slate-300" : "pr-3"
              }`}
            />
            {isShown("username") && (
              <button
                className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
                onClick={() => {
                  fieldResetHandler("username");
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
              className={`border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
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
        </div>

        <button
          className="bg-emerald-400 rounded-md py-2 text-sm mt-3 transition-all duration-150 hover:bg-emerald-500"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          Register
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
