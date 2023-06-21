import { Container } from "../../components";
import ProfileImage from "../../assets/profile.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container>
      <div className="shadow-md rounded-xl px-12 py-6 max-w-sm text-center flex flex-col gap-5 bg-white">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-gray-400 text-xs max-w-[16rem]">
            Hey, enter your email to get sign in to your account
          </p>
        </div>

        <div className="w-full text-center flex items-center justify-center">
          <img
            src={ProfileImage}
            className="w-2/3 rounded-full border-2 border-white shadow-md"
          />
        </div>

        <div>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="email address"
              className="border border-slate-100 px-2 py-2 rounded-md transition-all duration-200 focus:border-slate-300 placeholder:text-sm"
            />
            <button
              type="submit"
              className="bg-emerald-400 rounded-md py-2 text-sm transition-all duration-150 hover:bg-emerald-500"
            >
              Continue
            </button>
          </form>
        </div>

        <div className="mb-4">
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
