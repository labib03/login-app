import { ComponentChildren } from "preact";
import { Toaster } from "react-hot-toast";

type props = {
  children: ComponentChildren;
};

function Container({ children }: props) {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{ duration: 1000 }}
      />
      <div className="w-screen h-screen flex justify-center relative pt-7">
        <div>{children}</div>
      </div>
    </>
  );
}

export default Container;
