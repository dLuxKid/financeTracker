import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../contexts/authContext";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // signin with firebase
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      // error for no response
      if (!res) {
        throw new Error("Login failed");
      }
      // dispatch login event
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
      console.log(isCancelled);
    };
  }, []);

  return { isPending, error, login };
};
