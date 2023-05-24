import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  // const [isCancelled, setIsCancelled] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // signin with firebase
      const res = await signInWithEmailAndPassword(auth, email, password);
      // error for no response
      if (!res) {
        throw new Error("Login failed");
      }
      // dispatch login event
      dispatch({ type: "LOGIN", payload: res.user });

      navigate("/");

      setIsPending(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { isPending, error, login };
};
