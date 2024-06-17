import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/AuthProvider";

const RegisterPage = () => {
  const auth = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    affiliation: "",
    department: "",
    course: "",
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password || !credentials.name) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    try {
      await auth.registerAction(credentials);
    } catch (error) {
      console.error("Failed to register", error.message);
      alert("Não foi possível registrar. Por favor, tente novamente.");
    }
  };

  // GoogleAuth
  const handleGoogleSuccess = async (response) => {
    const tokenId = response.credential;
    try {
      await auth.googleRegisterAction(tokenId);
    } catch (error) {
      console.error("Failed to register with Google", error.message);
      alert(
        "Não foi possível registrar com o Google. Por favor, tente novamente."
      );
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google registration failed", error);
    alert(
      "Não foi possível registrar com o Google. Por favor, tente novamente."
    );
  };

  // GitHubAuth
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
        <h1 className="text-white font-bold text-3xl mb-4">Registrar</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={credentials.name}
            id="name"
            placeholder="Insira o seu nome"
            onChange={onChange}
          />
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
          <Input
            type="text"
            value={credentials.affiliation}
            id="affiliation"
            placeholder="Insira a sua afiliação"
            onChange={onChange}
          />
          <Input
            type="text"
            value={credentials.department}
            id="department"
            placeholder="Insira o seu departamento"
            onChange={onChange}
          />
          <Input
            type="text"
            value={credentials.course}
            id="course"
            placeholder="Insira o seu curso"
            onChange={onChange}
          />
          <Button className="mt-4 min-w-full" type="submit">
            Registrar
          </Button>
        </form>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            buttonText="Registrar com Google"
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
            Registrar com GitHub
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterPage;
