import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  return (
    <div>
      <h1>Login</h1>
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
    </div>
  );
};

export default LoginPage;
