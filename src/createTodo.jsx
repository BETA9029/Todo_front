import "bulma/css/bulma.css";

export default function CreateTodo({
  todo,
  onCheck = (f) => f,
  DeleteTodo = (f) => f,
}) {
  return (
    <div className="panel-block columns">
      <div className="field is-10 column">
        <label className="label">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onCheck({ ...todo, done: !todo.done })}
          />
          <span className={todo.done ? "has-text-grey-light" : ""}>
            {todo.todo}
          </span>
        </label>
      </div>

      <div className="column">
        <button
          type="submit"
          className="delete"
          onClick={() => DeleteTodo(todo)}
        ></button>
      </div>
    </div>
  );
}
