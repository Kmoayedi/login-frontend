import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [welcome, setWelcome] = useState("");

  const register = async () => {
    const res = await fetch("https://DEIN-BACKEND.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  setWelcome(data.message);
  };

  const login = async () => {
    const res = await fetch("https://DEIN-BACKEND.onrender.com/login", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">

        <h2 className="text-2xl font-bold text-center mb-6">
          Willkommen 👋
        </h2>
        <input
           className="w-full p-3 mb-4 border rounded-lg"
           placeholder="Name"
           onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="E-Mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Passwort"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition mb-3"
        >
          Login
        </button>

        <button
          onClick={register}
          className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition"
        >
          Registrieren
        </button>
        {welcome && (
          <p className="mt-4 text-green-600 font-semibold">
          {welcome}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;