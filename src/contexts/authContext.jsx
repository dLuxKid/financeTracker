// REACT
import { createContext, useReducer, useContext, useEffect } from "react";
// FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

// declaring auth context
export const AuthContext = createContext();

// authentication reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// auth context provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  // function to check if user is logged in or out when page loads
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unSubscribe();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// auth context hook
export const useAuthContext = () => useContext(AuthContext);
