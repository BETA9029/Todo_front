import jwt_Decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const useTokenLogin = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return null;
    }
    const decode = jwt_Decode(token);
    const userEmail = decode.email;
    console.log(userEmail);
    console.log(decode);
    if (!userEmail) {
      navigate("/user/login");
      return null;
    }
    setEmail(userEmail);
  }, [navigate]);
  return email;
};
