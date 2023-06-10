import jwt_Decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";

export const useTokenLogin = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return;
    }
    const decode = jwt_Decode(token);
    const userEmail = decode.email;
    if (!userEmail) navigate("/user/login");
    setEmail(userEmail);
  }, []);
  return email;
};
