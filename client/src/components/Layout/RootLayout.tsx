import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      {/*<Navbar />*/}
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
