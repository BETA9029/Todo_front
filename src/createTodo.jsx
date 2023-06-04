import "bulma/css/bulma.css";

export default function CreateTodo({
  todo,
  onCheck = (f) => f,
  DeleteTodo = (f) => f,
}) {
  return (
    <p className="panel-block">
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onCheck({ ...todo, done: !todo.done })}
        />
        <span className={todo.done ? "has-text-grey-light" : ""}>
          {todo.todo}
        </span>
      </label>
      <button
        type="submit"
        className="delete"
        onClick={() => DeleteTodo(todo)}
      ></button>
    </p>
  );
}
