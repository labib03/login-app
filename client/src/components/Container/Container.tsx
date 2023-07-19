import { ComponentChildren } from "preact";
import { Toaster } from "react-hot-toast";

type props = {
  children: ComponentChildren;
};

function Container({ children }: props) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-full h-full flex justify-center relative pt-7 mb-8">
        <div>{children}</div>
      </div>
    </>
  );
}

export default Container;
