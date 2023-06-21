import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, LoginPage, PasswordPage } from "./pages";

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
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
