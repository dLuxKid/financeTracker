import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

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
    default:
      return response;
  }
};

const useFirestore = () => {
  const [response, dispatch] = useReducer(fireStoreReducer, initialState);
  // const [isCancelled, setIsCancelled] = useState(false);

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

      console.log(docRef);
    } catch (error) {
      // if error dispatch error to state
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const deleteData = async (name) => {
    await deleteDoc(doc(db, "transactions", name));
  };

  return { addData, deleteData, response };
};

export default useFirestore;
