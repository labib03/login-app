import { ComponentChildren } from "preact";

type props = {
  children: ComponentChildren;
};

function Container({ children }: props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

export default Container;
