import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);

  const API = "https://login-backend-q71a.onrender.com";

  const auth = async () => {
    setLoading(true);
    setError("");

    const endpoint = mode === "login" ? "/login" : "/register";

    try {
      const res = await fetch(API + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (data.token) {
        loadUser();
      } else {
        setError(data.error || "Fehler");
      }
    } catch (err) {
      setError("Server Fehler");
    }

    setLoading(false);
  };

  const loadUser = async () => {
    const res = await fetch(API + "/me");
    const data = await res.json();
    setUser(data);
  };

  const deposit = async () => {
    await fetch(API + "/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });

    loadUser();
  };

  // 🔥 HIER IST DER WICHTIGE PART
  if (user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl mb-6">Dashboard</h1>

        <div className="bg-white/10 p-6 rounded-xl mb-6">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p className="text-xl mt-2">💰 Guthaben: {user.balance} €</p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <input
            type="number"
            placeholder="Betrag"
            className="p-2 text-black"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={deposit}
            className="ml-3 bg-green-500 px-4 py-2 rounded"
          >
            Einzahlen
          </button>
        </div>
      </div>
    );
  }

  // 🔵 LOGIN / REGISTER
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 p-4">

      <div className="relative backdrop-blur-lg bg-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white border border-white/20">

        <h2 className="text-3xl font-bold text-center mb-6">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        <input
          type="email"
          placeholder="E-Mail"
          className="w-full p-3 mb-4 rounded-lg bg-white/20"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={show ? "text" : "password"}
          placeholder="Passwort"
          className="w-full p-3 mb-4 rounded-lg bg-white/20"
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "register" && (
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 rounded-lg bg-white/20"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {error && <p className="text-red-300 mb-4">{error}</p>}

        <button
          onClick={auth}
          className="w-full bg-white text-black py-3 rounded-lg"
        >
          {loading ? "Lädt..." : mode}
        </button>

        <p
          className="text-center mt-4 cursor-pointer"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          Switch
        </p>
      </div>
    </div>
  );
}

export default App;