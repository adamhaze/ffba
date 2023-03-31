// source: https://developer.auth0.com/resources/guides/spa/react/basic-authentication#add-user-login-to-react

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};