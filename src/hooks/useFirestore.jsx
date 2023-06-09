// REACT
import { useReducer } from "react";
// FIREBASE
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// state
const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

// reducer function
const fireStoreReducer = (response, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        isPending: true,
        document: null,
        error: null,
        success: false,
      };
    case "SUCCESS":
      return {
        document: action.payload,
        success: true,
        isPending: false,
        error: null,
      };
    case "ERROR":
      return {
        error: action.payload,
        success: false,
        document: null,
        isPending: false,
      };
    case "DELETED":
      return {
        error: null,
        success: true,
        document: null,
        isPending: false,
      };
    default:
      return response;
  }
};

const useFirestore = () => {
  const [response, dispatch] = useReducer(fireStoreReducer, initialState);

  // add transaction to the database
  const addData = async (uid, name, amount) => {
    // dispatch pending state
    dispatch({ type: "PENDING" });
    //  add collection to firestore
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        uid,
        transactionName: name,
        transactionAmount: amount,
        transactionDate: Timestamp.now(),
      });
      // dispatch docRef to state
      dispatch({ type: "SUCCESS", payload: docRef });
    } catch (error) {
      // if error dispatch error to state
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // delete transaction from the database
  const deleteData = async (id) => {
    dispatch({ type: "PENDING" });
    try {
      await deleteDoc(doc(db, "transactions", id));
      dispatch({ type: "DELETE" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "could not delete" });
    }
  };

  return { addData, deleteData, response };
};

export default useFirestore;
