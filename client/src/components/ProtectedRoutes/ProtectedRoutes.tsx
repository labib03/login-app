import { ComponentChildren } from "preact";
import { FC } from "preact/compat";
import Login from "../../pages/Login/Login.tsx";

type Props = { children: ComponentChildren };
const ProtectedRoutes: FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
