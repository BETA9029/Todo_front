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

export const useFetch = ({ skip, ...rest }) => {
  const navigate = useNavigate();
  const [args, setArgs] = useState(rest);
  const [state, dipatch] = useReducer(reducer, {
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const { path, ...options } = args;

    if (skip) return dipatch({ actionType: "loaded" });

    // ロード中にする
    dipatch({ actionType: "loading" });

    fetch("https://todo-api-zu94.onrender.com" + path, {
      ...options,
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
  const refetch = (reFetchArgs) => setArgs({ ...rest, ...reFetchArgs });

  return [state.data, state.loading, state.error, refetch];
};
