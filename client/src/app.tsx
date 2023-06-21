import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage, LoginPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
