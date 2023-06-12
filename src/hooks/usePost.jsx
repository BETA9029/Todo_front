import { useEffect, useReducer, useState } from "react";

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

export const usePost = (skip, onComplete, Todo, email) => {
  const [skipState, setSkip] = useState(skip);
  const [args, setArgs] = useState(Todo);
  const [state, dipatch] = useReducer(reducer, {
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // const { path, ...options } = args;

    if (skipState) return dipatch({ actionType: "loaded" });

    // ロード中にする
    dipatch({ actionType: "loading" });

    fetch("https://todo-api-zu94.onrender.com/create", {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: args,
        done: "false",
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((value) => dipatch({ actionType: "setResponse", value }))
      .then(() => onComplete())
      .catch((error) => {
        dipatch({ actionType: "setError", value: error });
      });
  }, [args]);

  // 再取得関数
  const refetch = (reFetchArgs) => {
    setSkip(false);
    setArgs(reFetchArgs);
  };

  return [state.data, state.loading, state.error, refetch];
};
