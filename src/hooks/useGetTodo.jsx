import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const reducer = (preState, { actionType, value }) => {
  switch (actionType) {
    case "loading":
      return { ...preState, loading: true };
    case "loaded":
      return { ...preState, loading: false };
    case "setResponse":
      return { data: value, loading: false, error: null };
    case "setError":
      return { data: null, loading: false, error: value };
    default:
      return preState;
  }
};

export const useGetTodo = () => {
  const token = { jwt: localStorage.getItem("token") };
  const navigate = useNavigate();
  const [args, setArgs] = useState(token);
  const [state, dipatch] = useReducer(reducer, {
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // ロード中にする
    dipatch({ actionType: "loading" });

    fetch("https://todo-api-zu94.onrender.com", {
      method: "GET",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
        token: `Bearer ${args.jwt}`,
      },
    })
      .then((res) => res.json())
      .then((value) => {
        if (!value.alltodo) throw new Error();
        dipatch({ actionType: "setResponse", value: value.alltodo });
      })
      .catch((error) => {
        dipatch({ actionType: "setError", value: error });
        navigate("/user/login");
      });
  }, [args]);

  // 再取得関数
  const refetch = (reToken) => setArgs({ ...args, ...reToken });

  return [state.data, state.loading, state.error, refetch];
};
