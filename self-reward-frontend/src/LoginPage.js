import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";


function LoginPage() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log("Google login successful:", response);
    const userObject = jwtDecode(response.credential); // Decoding the JWT token
    setUser(userObject);
  };

  const handleLoginFailure = (error) => {
    console.log("Google login failed:", error);
  };

  return (
    <div className="login-container">
      <h1>Welcome to ProDUCKtivity</h1>
      <br/>
      <h2>Login</h2>
      <br/>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      ) : (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <img src={user.picture} alt={user.name} />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
