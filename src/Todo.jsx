import InputTodo from "./InputTodo";
import CreateTodo from "./createTodo";
import Header from "./Header";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import "react-native-get-random-values";
import "bulma/css/bulma.css";

export default function Todo() {
  const [Todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [email, setEmail] = useState({});
  const navigate = useNavigate();

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

  //指定されたIDの真偽の入れ替えをした配列をステートに入れなおす
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

  //指定されたIDのデータを削除した配列をステートに入れなおす
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
