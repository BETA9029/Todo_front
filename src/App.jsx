import Input from "./Input";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import "react-native-get-random-values";
import "bulma/css/bulma.css";

export const TodoAP = () => {
  const [Todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const APIconect = () => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((json) => {
        json && setTodos(json.alltodo);
        console.log(json);
      })
      .catch(() => alert("error"));
  };

  //初回描画時のみローカルストレージからデータをロードし、ステートに保存
  useEffect(() => {
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
        todo: Todo,
        done: "false",
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
    <div className="panel is-primary">
      <h1 className="panel-heading has-text-centered">TODO</h1>
      <Input AddTodos={AddTodos} text={text} setText={setText} />
      {Todos.map((todos) => (
        <Todo
          key={todos._id}
          todo={todos}
          onCheck={onCheck}
          DeleteTodo={DeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoAP;