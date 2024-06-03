import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "../hooks/AuthProvider";

const LoginPage = () => {
  const auth = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      await auth.loginAction(credentials);
      if (auth.error) {
        alert(auth.error);
        return;
      }
    } catch (error) {
      console.error("Failed to login", error.message);
      alert("Não foi possível iniciar sessão. Por favor, tente novamente.");
    }
  };

  return (
    <div className="bg-dark min-h-screen p-14 text-white">
      <h1 className="text-white font-bold text-3xl mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={credentials.email}
          id="email"
          placeholder="Insira o seu email"
          onChange={onChange}
        />
        <Input
          type="password"
          value={credentials.password}
          id="password"
          placeholder="Insira a sua palavra-passe"
          onChange={onChange}
        />
        {/* <span>
          Não estás registado?{" "}
          <a href="/register" className="text-blue-400">
            Regista-te
          </a>
        </span> */}
        <Button className="mt-4 min-w-full" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
