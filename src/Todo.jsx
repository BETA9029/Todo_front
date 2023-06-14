import InputTodo from "./InputTodo";
import CreateTodo from "./createTodo";
import Header from "./Header";
import "bulma/css/bulma.css";
import { useGetTodo } from "./hooks/useGetTodo";
//import { useFetch } from "./hooks/useFetch";
import { useTokenLogin } from "./hooks/useTokenLogin";

export default function Todo() {
  const email = useTokenLogin();
  const [data, loading, error, fetchTodos] = useGetTodo();

  // const [data, loading, error, fetchTodos] = useFetch({
  //   path: "",
  //   method: "GET",
  //   headers: {
  //     Accept: "aplication/json",
  //     "Content-Type": "application/json",
  //     token: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // });

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
      .then(() => fetchTodos())
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
      .then(() => fetchTodos())
      .catch(() => alert("error"));
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header title="TODO" linkName="ログアウト" link="/user/login" />

      <InputTodo fetchTodos={fetchTodos} email={email} />
      {data.map((todos) => (
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
