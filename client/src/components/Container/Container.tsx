import { ComponentChildren } from "preact";
import { Toaster } from "react-hot-toast";

type props = {
  children: ComponentChildren;
};

function Container({ children }: props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{ duration: 1000 }}
      />
      {children}
    </div>
  );
}

export default Container;
