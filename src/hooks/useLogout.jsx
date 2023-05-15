import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthContext } from "../contexts/authContext";
import { useEffect, useState } from "react";

export const useLogout = () => {
  // Error and pending state
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  //  cancelled state
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = () => {
    setError(null);
    setIsPending(true);

    //  signuout
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });

        // update state
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
        }
      });
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { logout, error, isPending };
};
