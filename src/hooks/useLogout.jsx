// REACT
import { useEffect, useState } from "react";
// FIREBASE
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
// HOOK
import { useAuthContext } from "../contexts/authContext";

// log out function
export const useLogout = () => {
  // Error and pending state
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = () => {
    setError(null);
    setIsPending(true);

    //  signuout
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });

        // update state

        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });
  };

  return { logout, error, isPending };
};
