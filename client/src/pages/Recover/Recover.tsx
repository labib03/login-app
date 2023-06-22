import { Link } from "react-router-dom";
import { Container } from "../../components";

const Recover = () => {
  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-14 max-w-sm text-center flex flex-col bg-white">
        <div className="absolute top-5 left-5">
          <Link to="/">Back</Link>
        </div>

        <div className="w-full flex flex-col items-center gap-2 mb-20">
          <h1 className="text-3xl font-semibold">Recover Password</h1>

          <p className="text-gray-400 text-xs max-w-[16rem]">
            Enter OTP to recover your password
          </p>
        </div>

        <div className="relative w-full flex flex-col gap-3">
          <p className="text-xs">
            Enter the 6-digit OTP code that we sent to your email EMAIL
          </p>
          <input
            type="text"
            placeholder="OTP"
            className={`border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0`}
          />
        </div>

        <button
          className="bg-emerald-400 rounded-md py-2 text-sm mt-2 transition-all duration-150 hover:bg-emerald-500"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Recover
        </button>

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
