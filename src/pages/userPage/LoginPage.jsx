import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { demoData } from "../../utils/demoData";

const LoginPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // States for email, password, and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if slug exists in demo data
    if (slug !== demoData.company.slug) {
      setError("Invalid company URL.");
      navigate(`/404`);
      return;
    }

    // Authenticate with demo data
    const user = demoData.user;
    if (email === user.email && password === "123") {
      // Redirect securely to client dashboard
      navigate(`/${slug}/client`);
    } else {
      setError("Invalid login credentials.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: demoData.company.colorPalette.primary }}
    >
      <img src={demoData.company.logo} alt="Logo" className="w-32 mb-6" />
      <h1 className="text-2xl text-white mb-4">{demoData.company.name}</h1>
      <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
