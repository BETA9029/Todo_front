import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => localStorage.setItem("token", json.token))
      .then(() => navigate("/"))
      .catch((err) => alert("ログインに失敗"));
  };

  return (
    <div>
      <h1>ログイン</h1>

      <input
        type="text"
        name={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        required
      />

      <input
        type="text"
        name={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        required
      />

      <button type="submit" className="register" onClick={() => handleSubmit()}>
        ログイン
      </button>
    </div>
  );
}
