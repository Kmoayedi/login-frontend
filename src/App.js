import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await fetch("https://login-backend-q71a.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    alert("Registriert!");
  };

  const login = async () => {
    const res = await fetch("https://login-backend-q71a.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      alert("Login erfolgreich");
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <br /><br />

      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" />
      <br /><br />

      <button onClick={register}>Registrieren</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;