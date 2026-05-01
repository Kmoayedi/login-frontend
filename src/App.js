import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
     setLoading(true);      // 👈 Start loading
     setError("");          // 👈 Fehler zurücksetzen

  //Payment button
  const buy = async () => {
  const res = await fetch("https://DEIN-BACKEND.onrender.com/create-checkout", {
    method: "POST",
  });

  const data = await res.json();
  window.location.href = data.url;
};

  // Passwort prüfen
    if (password.length < 6) {

      setError("Passwort zu kurz");
      setLoading(false);
      return;
    }

  try {
    const res = await fetch("https://DEIN-BACKEND.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token); // 👈 Speichern
      alert("Login erfolgreich!");
    } else {
      setError(data.error);
    }
  } catch (err) {
    setError("Server nicht erreichbar");
  }

  setLoading(false); // 👈 Ende loading
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700">

      {/* Glow Effekt */}
      <div className="absolute w-96 h-96 bg-purple-500 blur-3xl opacity-30 rounded-full top-10 left-10"></div>

      {/* Card */}
      <div className="relative backdrop-blur-lg bg-white/10 p-10 rounded-3xl shadow-2xl w-96 text-white border border-white/20">

        <h2 className="text-3xl font-bold text-center mb-6">
          Willkommen zurück 👋
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="E-Mail"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-white outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Passwort */}
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Passwort"
            className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-white outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            👁️
          </span>
        </div>

        {/* Fehler */}
        {error && (
          <p className="text-red-300 mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={login}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold"
        >
          {loading ? "Lädt..." : "Einloggen"}
        </button>

        <p className="text-center text-sm mt-4 opacity-70">
          Noch kein Account? Registrieren
        </p>
      </div>
    </div>
  );
}

export default App;