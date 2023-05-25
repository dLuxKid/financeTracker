import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useCollection = (collectionType) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // for everytime a transcation is done, we fetch the data and update the document
    const unsubscribe = onSnapshot(
      collection(db, collectionType),
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

    return () => unsubscribe();
  }, [collectionType]);

  return { error, documents };
};

export default useCollection;
