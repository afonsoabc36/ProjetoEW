import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "../common/Button";
import { useAuth } from "../../hooks/AuthProvider";

const Layout = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen min-w-full bg-dark text-white">
      <nav className="relatives p-5 mx-auto border-b-[0.3rem]">
        <div className="flex justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold text-left">Gestor de UC's</h1>
          </Link>
          <div>
            <Link to="/admin" className="mr-2">
              <Button variant="nobg" size="sm">
                Admin
              </Button>
            </Link>
            <Link to="/perfil" className="mr-2">
              <Button variant="nobg" size="sm">
                Perfil
              </Button>
            </Link>
            <Button
              className="mx-2"
              size="sm"
              variant="nobg"
              onClick={() => auth.logOut()}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <div className="container md:px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0 md:justify-center mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
