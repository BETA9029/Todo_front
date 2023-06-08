import "bulma/css/bulma.css";

export default function InputTodo({ text, setText, AddTodos }) {
  const enter = (e) => {
    if (e.key === "Enter") {
      if (text === "") return;
      AddTodos(text);
      setText("");
    }
  };

  return (
    <div className="panel-block">
      <input
        className="input is-primary"
        type="text"
        value={text}
        placeholder="Todoを追加"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={enter}
      />
    </div>
  );
}
