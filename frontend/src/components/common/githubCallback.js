import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useAuth } from '../../hooks/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const GitHubCallback = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const { code } = queryString.parse(search);
    if (code) {
      auth.githubLoginAction(code);
    } else {
      console.error('GitHub login failed: No code found in URL query params');
      alert('GitHub login failed. Please try again.');
      navigate('/login');
    }
  }, [search, auth, navigate]);

  return (
    <div className="bg-dark min-h-screen p-14 text-white">
      <h1 className="text-white font-bold text-3xl mb-4">GitHub Login</h1>
      <p>Processing login...</p>
    </div>
  );
};

export default GitHubCallback;
