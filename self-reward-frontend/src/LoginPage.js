import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import axios from "axios";


function LoginPage() {
  const [user, setUser] = useState(null);

   useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user state
    }
  }, []);

   const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setUser(null);
  };

   const handleLoginSuccess = async (response) => {
    console.log("Google login successful:", response);
    const userObject = jwtDecode(response.credential); // Decoding the JWT token
    setUser(userObject);

    // Send the user details to the backend
    try {
      const backendResponse = await axios.post('http://127.0.0.1:8000/home/', {
        email: userObject.email,
        name: userObject.name,
        picture: userObject.picture,
      });

      console.log("Backend response:", backendResponse.data);
    } catch (error) {
      console.error("Error calling the backend:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log("Google login failed:", error);
  };

  return (
      <div className="login-container">
          <h1>Welcome to HabitCoin</h1>
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
                  <img src={user.picture} alt={user.name}/>
              </div>
          )}

          <br/>

          {user && <button onClick={handleLogout}>Logout</button>}

      </div>
  );
}

export default LoginPage;
