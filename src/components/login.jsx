import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка авторизации");
      }

      sessionStorage.setItem("token", data.token);
      alert("Успешный вход!");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login_form">
      <div className="input_item">
        <p>Логин</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input_item">
        <p>Пароль</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin} className="submit_btn">
        Войти
      </button>
    </div>
  );
};

export default Login;
