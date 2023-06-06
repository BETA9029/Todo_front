import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_Decode from "jwt-decode";

export default function useAuth() {
  const [LoginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
    }
    const decode = jwt_Decode(token);
    setLoginUser(decode.email);
    console.log(LoginUser);
    if (LoginUser) navigate("/user/login");
    // try {
    //   const decode = jwt_Decode(token);
    //   setLoginUser(decode.email);
    //   console.log(LoginUser);
    // } catch {
    //   navigate("/user/login");
    // }
  }, [navigate]);
  return LoginUser;
}

try {
  const decode = jwt_Decode(token);
  console.log("email " + decode.email);
  setTodos(APIconect(decode.email));
  console.log("state " + email);
  if (!email) {
    navigate("/user/login");
    return;
  }
} catch {
  navigate("/user/login");
  return;
}
