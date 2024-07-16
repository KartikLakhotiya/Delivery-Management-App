import React, { useState } from "react";
import "./App.css";
import Orders from "./components/Orders/Orders";

import firebaseConfig from "./config";
import firebase from "firebase/app";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault()

    const nameForm = e.target.name.value
    const passwordForm = e.target.password.value

    if (nameForm === "admin@admin.com" && passwordForm === "admin@123") {
      setLoggedIn(true);
      setError("");
    } else {
      setLoggedIn(false);
      setError("Invalid email or password");
    }
  };

  if (firebase.apps.length > 0) {
  } else {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <Orders name={name} />
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
