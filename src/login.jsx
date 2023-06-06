import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (!password) return;

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
      .then((res) => {
        setPassword("");
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((json) => localStorage.setItem("token", json.token))
      .then(() => navigate("/"))
      .catch((err) => alert("メールアドレスまたはパスワードが違います"));
  };

  return (
    <div>
      <div>
        <h3 className="has-text-centered">ログイン</h3>
      </div>

      <div className="buttons is-right">
        <button className="button is-primary">
          <Link to="/user/register">新規登録</Link>
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="box">
        <div className="field">
          <label className="label">
            メールアドレス
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
            />
          </label>
        </div>

        <div className="field">
          <label className="label">
            パスワード
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワード"
            />
          </label>
        </div>

        <div className="buttons is-right panel-block">
          <button className="button is-primary is-fullwidth" type="submit">
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
}
