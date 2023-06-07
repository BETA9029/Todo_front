const GetTodo = () => {
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
    .then(() => GetTodo())
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
    .then(() => GetTodo())
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
    .then(() => GetTodo())
    .catch(() => alert("error"));
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!email) return;
  if (!password) return;

  fetch("https://todo-api-zu94.onrender.com/user/login", {
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

const handleSubmit2 = (e) => {
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
