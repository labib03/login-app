import { Container, FormButton } from "../../components";
import ProfileImage from "../../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { FormikFormProps, useFormik } from "formik";
import { usernameValidate } from "@/helpers/validate.ts";
import { useAuthStore } from "@/store/store.ts";
import { useState } from "preact/hooks";
import { InputText } from "@/components";

const Login = () => {
  const { setUsername } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik: FormikFormProps = useFormik({
    initialValues: {
      userName: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: { userName: string }) => {
      setLoading(true);

      setTimeout(() => {
        setUsername(values.userName);
        navigate("/password");
        setLoading(false);
      }, 1000);
    },
  });

  const buttonHandler = (e: Event) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-14 max-w-sm text-center flex flex-col bg-white">
        <div className="w-full flex flex-col items-center gap-3 mb-8">
          <h1 className="text-3xl font-semibold">Login Page</h1>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            Hey, enter your username to get continue to next page
          </p>
        </div>

        <div className="w-full text-center flex items-center justify-center mb-8">
          <img
            src={ProfileImage}
            className="w-2/4 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <InputText formik={formik} field="userName" placeholder="Username" />

        <FormButton onClick={buttonHandler} text="Continue" loading={loading} />

        <div className="mb-4 mt-5">
          <p className="text-xs">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
