import "bulma/css/bulma.css";
import React, { useState } from "react";
import { useTodo } from "./hooks/useTodo";

export default function InputTodo({ fetchTodos, email }) {
  const [text, setText] = useState("");

  const [data, loading, error, AddTodo] = useTodo(true, fetchTodos, {
    path: "create",
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
  });

  const enter = (e) => {
    if (e.key === "Enter") {
      if (text === "") return;
      AddTodo();
      setText("");
    }
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(loading);

  return (
    <div className="panel-block">
      <input
        className="input is-primary"
        type="text"
        value={text}
        placeholder="Todoを追加"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => enter(e)}
      />
    </div>
  );
}
