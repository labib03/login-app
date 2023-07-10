import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import {
    ErrorPage,
    LoginPage,
    PasswordPage,
    ProfilePage,
    RecoverPage,
    RegisterPage,
    ResetPasswordPage,
} from "./pages";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/", element: <LoginPage/>},
            {
                path: "/password",
                element: <PasswordPage/>,
            },
            {
                path: "/recover",
                element: <RecoverPage/>,
            },
            {
                path: "/reset",
                element: <ResetPasswordPage/>,
            },
            {
                path: "/register",
                element: <RegisterPage/>,
            },
            {
                path: "/profile",
                element: <ProfilePage/>,
            },
        ],
    },
]);

export function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}
