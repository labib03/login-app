import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function RootLayout() {
  return (
    <>
      <Navbar />

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
