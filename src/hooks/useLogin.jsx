// REACT
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// FIREBASE
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// CONTEXT HOOK
import { useAuthContext } from "../contexts/authContext";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  // login function
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
