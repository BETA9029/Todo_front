import { Route, Routes, BrowserRouter } from "react-router-dom";
import Todo from "./Todo";
import Login from "./login";
import Register from "./register";

export default function App() {
  return (
    <BrowserRouter>
      <div className="panel is-primary">
        <h1 className="panel-heading has-text-centered">TODO</h1>
        <Routes>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
