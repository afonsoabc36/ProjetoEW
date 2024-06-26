import Input from "../components/common/Input";
import { useAuth } from "../hooks/AuthProvider";
import Button from "../components/common/Button";
import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

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
    } catch (error) {
      console.error("Failed to login", error.message);
      alert("Não foi possível iniciar sessão. Por favor, tente novamente.");
    }
  };

  //GoogleAuth
  const handleGoogleSuccess = async (response) => {
    const tokenId = response.credential;
    try {
      await auth.googleLoginAction(tokenId);
    } catch (error) {
      console.error("Failed to login with Google", error.message);
      alert(
        "Não foi possível iniciar sessão com o Google. Por favor, tente novamente."
      );
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed", error);
    alert(
      "Não foi possível iniciar sessão com o Google. Por favor, tente novamente."
    );
  };

  //GitHubAuth
  const handleGitHubLogin = async () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/github-callback"
    );
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    window.location.href = githubAuthUrl;
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
          <div className="flex mt-4 min-w-full">
            <Button className="w-[50%]" type="submit">
              Entrar
            </Button>

            <div className="w-[50%] ml-2">
              <Link to="/register">
                <Button variant="primary" className="w-full">
                  Registar
                </Button>
              </Link>
            </div>
          </div>
        </form>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            buttonText="Entrar com Google"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleGitHubLogin}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub logo"
              className="h-5 w-5 mr-2"
            />
            Entrar com GitHub
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
