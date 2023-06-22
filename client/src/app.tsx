import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  LoginPage,
  PasswordPage,
  RecoverPage,
  ResetPasswordPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/password",
    element: <PasswordPage />,
  },
  {
    path: "/recover",
    element: <RecoverPage />,
  },
  {
    path: "/reset",
    element: <ResetPasswordPage />,
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
