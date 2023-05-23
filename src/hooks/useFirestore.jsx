import { addDoc, collection } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const fireStoreReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const useFirestore = () => {
  const [response, dispatch] = useReducer(fireStoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const addData = async (name, amount) => {
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        transactionName: name,
        transactionAmount: amount,
      });
      dispatch({ type: "SUCCESS", payload: docRef });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const deleteData = () => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addData, deleteData, ...response };
};

export default useFirestore;
