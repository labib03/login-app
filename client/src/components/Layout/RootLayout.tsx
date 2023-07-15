import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth.tsx";

function RootLayout() {
  return (
    <>
      {/*<Navbar />*/}
      <AuthProvider>
        <div>
          <Outlet />
        </div>
      </AuthProvider>
    </>
  );
}

export default RootLayout;
