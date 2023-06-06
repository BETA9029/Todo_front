import InputTodo from "./InputTodo";
import CreateTodo from "./createTodo";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-native-get-random-values";
import "bulma/css/bulma.css";

export default function Todo() {
  const [Todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [email, setEmail] = useState({});
  const navigate = useNavigate();

  const APIconect = () => {
    fetch("http://localhost:5000", {
      method: "GET",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setEmail(json.email);
        setTodos(json.alltodo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //初回描画時のみローカルストレージからデータをロードし、ステートに保存
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return;
    }
    APIconect();
  }, []);

  //Todosのステートにinputコンポから受け取った入力データをステートに追加する
  const AddTodos = (Todo) => {
    fetch("http://localhost:5000/create", {
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

  //指定されたIDの真偽の入れ替えをした配列をステートに入れなおす
  const onCheck = (todo) => {
    console.log(`http://localhost:5000/update/${todo._id}`);
    fetch(`http://localhost:5000/update/${todo._id}`, {
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

  //指定されたIDのデータを削除した配列をステートに入れなおす
  const DeleteTodo = (DeleteTodo) => {
    fetch(`http://localhost:5000/delete/${DeleteTodo._id}`, {
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
      <div>
        <h3 className="has-text-centered">TODO</h3>
      </div>

      <div className="buttons is-right">
        <button
          className="button is-primary"
          onClick={() => navigate("/user/login")}
        >
          ログアウト
        </button>
      </div>

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
