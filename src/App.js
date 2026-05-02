import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("login"); // login | register
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);

  const API = "https://login-backend-q71a.onrender.com";

  const auth = async () => {
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen haben");
      setLoading(false);
      return;
    }

    const endpoint = mode === "login" ? "/login" : "/register";

   
    const res = await fetch(API + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
      
    if (data.token) {
        loadUser();
    }
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
  }

  const buyPremium = async () => {
    try {
      const res = await fetch(API + "/create-checkout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert("Payment Fehler");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 p-4">

      {/* Ad Banner */}
      <div className="w-full max-w-md mb-4 bg-yellow-300 text-black p-3 rounded-xl text-center font-semibold">
        🔥 Werbung: Upgrade auf Premium und entferne Ads!
      </div>

      {/* Card */}
      <div className="relative backdrop-blur-lg bg-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white border border-white/20">

        <h2 className="text-3xl font-bold text-center mb-2">
          {mode === "login" ? "Willkommen zurück 👋" : "Account erstellen 🚀"}
        </h2>

        <p className="text-center text-sm mb-6 opacity-70">
          {mode === "login"
            ? "Melde dich an, um fortzufahren"
            : "Erstelle deinen kostenlosen Account"}
        </p>

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
        {mode === "register" && (
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 rounded-lg bg-white/20"
            onChange={(e) => setName(e.target.value)}
          />
        )}
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            👁️
          </span>
        </div>

        {error && <p className="text-red-300 mb-4 text-sm">{error}</p>}

        <button
          onClick={auth}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold"
        >
          {loading ? "Lädt..." : mode === "login" ? "Einloggen" : "Registrieren"}
        </button>

        <button
          onClick={buyPremium}
          className="w-full mt-3 bg-yellow-400 text-black py-2 rounded-lg font-semibold"
        >
          💎 Premium kaufen
        </button>

        <p className="text-center text-sm mt-4 opacity-70 cursor-pointer"
           onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "Noch kein Account? Registrieren"
            : "Schon Account? Einloggen"}
        </p>
      </div>
    </div>
  );
}

 // ================= DASHBOARD =================
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
          <button onClick={deposit} className="ml-3 bg-green-500 px-4 py-2 rounded">
            Einzahlen
          </button>
        </div>
      </div>
    );
  }

  // ================= LOGIN =================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-700">
      <div className="bg-white/10 p-10 rounded-xl text-white">
        <h2 className="text-2xl mb-4">{mode}</h2>

        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="block mb-2 p-2 text-black" />
        <input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="block mb-2 p-2 text-black" />

        {mode === "register" && (
          <input placeholder="Name" onChange={(e)=>setName(e.target.value)} className="block mb-2 p-2 text-black" />
        )}

        <button onClick={auth} className="bg-white text-black px-4 py-2">
          {mode}
        </button>

        <p onClick={()=>setMode(mode === "login" ? "register" : "login")}
           className="mt-4 cursor-pointer">
          Switch
        </p>
      </div>
    </div>
  );

export default App;
