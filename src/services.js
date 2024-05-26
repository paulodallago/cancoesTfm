import {
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

export const getCancoes = async () => {
  const querySnapshot = await getDocs(collection(db, "cancoes"));
  const newData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return newData;
};

export const getCategorias = async () => {
  const q = query(collection(db, "categorias"), orderBy("nome", "asc"));
  const querySnapshot = await getDocs(q);
  const newData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return newData;
};
