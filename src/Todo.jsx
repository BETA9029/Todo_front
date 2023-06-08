import InputTodo from "./InputTodo";
import CreateTodo from "./createTodo";
import Header from "./Header";
import jwt_Decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";

export default function Todo() {
  //サーバから受け取ったユーザのTodoを格納するステート
  const [Todos, setTodos] = useState([]);
  //新たに追加したtodoを一時的に入れるためのステート、InputTodoコンポーネントに渡す
  const [text, setText] = useState("");
  //ユーザのemailを格納するステート、
  const [email, setEmail] = useState({});
  const navigate = useNavigate();

  //APIサーバにgetリクエスト送りユーザのtodoをもらい、ステートTodosに入れる
  const APIconect = () => {
    fetch("https://todo-api-zu94.onrender.com", {
      method: "GET",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setTodos(json.alltodo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //初回描時にtokenがローカルストレージにありそれが有効ならAPIconectを実行
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return;
    }
    const decode = jwt_Decode(token);
    const userEmail = decode.email;
    // console.log(LoginUser);
    if (!userEmail) navigate("/user/login");
    setEmail(userEmail);
    APIconect();
  }, []);

  //追加されたさいにtodoをサーバにpostリクエストを送信し追加する。成功したらAPIconectを実行
  const AddTodos = () => {
    fetch("https://todo-api-zu94.onrender.com/create", {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: text,
        done: "false",
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .then(() => APIconect())
      .catch(() => alert("error"));
  };

  //チェックボックスが押されたら、todoの真偽を変換しものをサーバにPUTリクエストを送信し編集する。成功したらAPIconectを実行
  const onCheck = (todo) => {
    console.log(`https://todo-api-zu94.onrender.com/update/${todo._id}`);
    fetch(`https://todo-api-zu94.onrender.com/update/${todo._id}`, {
      method: "PUT",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todo.todo,
        done: todo.done,
        email: todo.email,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .then(() => APIconect())
      .catch(() => alert("error"));
  };

  //削除ボタンが押されたら、サーバにそのtodoのdeleteリクエストを送信。成功したらAPIconectを実行
  const DeleteTodo = (DeleteTodo) => {
    fetch(`https://todo-api-zu94.onrender.com/delete/${DeleteTodo._id}`, {
      method: "DELETE",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .then(() => APIconect())
      .catch(() => alert("error"));
  };

  return (
    <div>
      <Header title="TODO" linkName="ログアウト" link="/user/login" />

      <InputTodo AddTodos={AddTodos} text={text} setText={setText} />
      {Todos.map((todos) => (
        <CreateTodo
          key={todos._id}
          todo={todos}
          onCheck={onCheck}
          DeleteTodo={DeleteTodo}
        />
      ))}
    </div>
  );
}
