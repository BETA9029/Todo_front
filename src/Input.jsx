import "bulma/css/bulma.css";

export default function Input(props) {
  const enter = (e) => {
    if (e.key === "Enter") {
      if (props.text === "") return;
      props.AddTodos(props.text);
      props.setText("");
    }
  };

  return (
    <div className="panel-block">
      <input
        className="input is-primary"
        type="text"
        value={props.text}
        placeholder="Todoを追加"
        onChange={(e) => props.setText(e.target.value)}
        onKeyDown={enter}
      />
    </div>
  );
}
