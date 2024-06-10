import React from "react";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen min-w-full flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-lg">Não tens permissão para aceder a essa página.</p>

      <Link to="/">
        <Button className="m-5">Voltar</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
