import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useCollection = (collectionType, id) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // for everytime a transcation is done, we fetch the data and update the document
    const q = query(
      collection(db, collectionType),
      where("uid", "==", id),
      orderBy("transactionDate", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch data");
      }
    );

    // when page unmounts, the function is called to stop fetching from the database
    return () => unsubscribe();
  }, [collectionType]);

  return { error, documents };
};

export default useCollection;
