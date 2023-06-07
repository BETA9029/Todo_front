import { useNavigate } from "react-router-dom";

export default function Header({ title, linkName, link }) {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h3 className="has-text-centered">{title}</h3>
      </div>

      <div className="buttons is-right">
        <button
          className="button is-primary"
          onClick={() => navigate(`${link}`)}
        >
          {linkName}
        </button>
      </div>
    </div>
  );
}
