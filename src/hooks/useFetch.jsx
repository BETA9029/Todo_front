import { useEffect, useReducer, useState } from "react";

const reducer = (preState, { actionType, value }) => {
  switch (actionType) {
    case "loading":
      return { ...preState, loding: true };
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
      Accept: "aplication/json",
      "Content-Type": "application/json",
      ...options,
    })
      .then((response) => response.json())
      .then((value) => dipatch({ actionType: "setResponse", value }))
      .catch((error) => dipatch({ actionType: "setError", value: error }));
  }, [args]);

  // 再取得関数
  const refetch = (reFetchArgs) => setArgs({ ...rest, ...reFetchArgs });

  return [state.data, state.loading, state.error, refetch];
};
