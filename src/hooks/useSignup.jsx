// REACT
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// FIREBASE
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// CONTEXT HOOK
import { useAuthContext } from "../contexts/authContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  // sign in function
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }
      // add display name to user
      await updateProfile(res.user, { displayName });
      // dispatch event
      dispatch({ type: "LOGIN", payload: res.user });

      navigate("/");

      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
