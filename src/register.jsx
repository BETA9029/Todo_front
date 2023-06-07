import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    if (!email) return;
    if (!password) return;

    fetch("https://todo-api-zu94.onrender.com/user/register", {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        setPassword("");
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => navigate("/user/login"))
      .catch((err) => alert("すでに登録されているメールアドレスです。"));
  };

  return (
    <div>
      <div>
        <h3 className="has-text-centered">ユーザ登録登録</h3>
      </div>

      <div className="buttons is-right">
        <button className="button is-primary">
          <Link to="/user/login">ログイン</Link>
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="box">
        <div className="field">
          <label className="label">
            名前
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前"
            />
          </label>
        </div>

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
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
