import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, LoginPage, PasswordPage, RecoverPage } from "./pages";

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
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
