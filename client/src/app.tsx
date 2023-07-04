import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  LoginPage,
  PasswordPage,
  RecoverPage,
  RegisterPage,
  ResetPasswordPage,
} from "./pages";
import RootLayout from "./components/Layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LoginPage /> },
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
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
