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
