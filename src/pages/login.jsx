import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch(
        "https://api-omex.omexeth.io/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authorization error");
      }

      sessionStorage.setItem("token", data.token);

      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login_form">
      <div className="input_item">
        <p>Login</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input_item">
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin} className="submit_btn">
      Login
      </button>
    </div>
  );
};

export default LoginPage;
