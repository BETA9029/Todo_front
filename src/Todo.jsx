import InputTodo from "./InputTodo";
import CreateTodo from "./createTodo";
import useAuth from "./Auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_Decode from "jwt-decode";
import "react-native-get-random-values";
import "bulma/css/bulma.css";

export default function Todo() {
  const [Todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("a");
  const navigate = useNavigate();

  const APIconect = () => {
    fetch(`http://localhost:5000/${email}`)
      .then((res) => res.json())
      .then((json) => {
        json.alltodo && setTodos(json.alltodo);
        console.log(json);
      })
      .catch(() => alert("error_APICONECT"));
  };

  //初回描画時のみローカルストレージからデータをロードし、ステートに保存
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return;
    }
    try {
      const decode = jwt_Decode(token);
      setEmail(decode.email);
      console.log(email);
      if (!email) {
        localStorage.removeItem("token");
        navigate("/user/login");
        return;
      }
    } catch {
      localStorage.removeItem("token");
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
  // useAuth();

  return (
    <div>
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
