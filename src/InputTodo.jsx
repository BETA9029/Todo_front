import "bulma/css/bulma.css";
import React, { useState } from "react";
import { usePost } from "./hooks/usePost";

export default function InputTodo({ fetchTodos, email }) {
  const [text, setText] = useState("");

  // const [data, loading, error, AddTodo] = useTodo(true, fetchTodos, {
  //   path: "create",
  //   method: "POST",
  //   headers: {
  //     Accept: "aplication/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     todo: text,
  //     done: "false",
  //     email: email,
  //   }),
  // });

  const [data, loading, error, AddTodo] = usePost(
    true,
    fetchTodos,
    text,
    email
  );

  const enter = (e) => {
    if (e.key === "Enter") {
      if (text === "") return;
      AddTodo(text);
      setText("");
    }
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;

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
