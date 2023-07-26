import { BackButton, Container } from "../../components";
import { useAuthStore } from "@/store/store.ts";
import useGetUserDetail from "@/hooks/useGetUserDetail.tsx";
import { useEffect, useState } from "preact/hooks";
import { FormButton } from "@/components";

import toast from "react-hot-toast";
import { generateOTP, verifyOTP } from "@/helpers/fetch.ts";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Recover = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    auth: { userName },
  } = useAuthStore();

  const users = useGetUserDetail(userName);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      try {
        const response = await verifyOTP({ userName, code: value.otp });
        toast.success(response.data.message);
        navigate("/reset");
      } catch (err) {
        console.log("something", err);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setLoading(true);

    const sendEmail = async () => {
      try {
        const responseSendEmail: any = await generateOTP({
          userName,
        });
        const { message } = responseSendEmail.data;
        const duration = message.length * 100;

        toast.success(message, { duration });
      } catch (err) {
        console.log("err di recover page", err);
      } finally {
        setLoading(false);
      }
    };

    sendEmail();
  }, []);

  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-14 max-w-sm text-center flex flex-col bg-white">
        <BackButton />

        <div className="w-full flex flex-col items-center gap-2 mb-20">
          <h1 className="text-3xl font-semibold">Recover Password</h1>

          <p className="text-gray-400 text-xs max-w-[16rem]">
            Enter OTP to recover your password
          </p>
        </div>

        <div className="relative w-full flex flex-col gap-3">
          <p className="text-xs">
            Enter the 6-digit OTP code that we sent to your email{" "}
            <span className="underline underline-offset-2 decoration-emerald-400 font-semibold">
              {users?.email}
            </span>
          </p>

          <input
            value={formik.getFieldProps("otp").value}
            disabled={loading}
            type="number"
            placeholder="OTP Code"
            className={`border w-full border-slate-100 pl-3 pr-3.5 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0`}
            onChange={(e: Event) => {
              const inputElement = e.target as HTMLInputElement;
              const handler = formik.getFieldHelpers("otp");

              const valueToString = inputElement.value.slice(0, 6);
              handler.setValue(valueToString);
            }}
          />
        </div>

        <FormButton
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          text={"Recover"}
          loading={loading}
        />

        <div className="mb-4 mt-5">
          <p className="text-xs">
            Can't get OTP?{" "}
            <button className="font-semibold text-emerald-500">Resend</button>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Recover;
