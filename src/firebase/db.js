import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  increment
} from "firebase/firestore";
import { app } from './config';

const db = getFirestore(app);

export const getProducts = async () => {
  const result = await getDocs(collection(db, "productos"));
  return result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductsByCategory = async (categoria) => {
  const q = query(collection(db, "productos"), where("categoria", "==", categoria));
  const result = await getDocs(q);
  return result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProduct = async (id) => {
  const docRef = doc(db, "productos", id);
  const result = await getDoc(docRef);
  return result.exists() ? { ...result.data(), id: result.id } : null;
};

export const createOrder = async (orden) => {
  const result = await addDoc(collection(db, "ordenes"), orden);
  return result.id;
};

export async function updateProductStock(productId, quantity) {
  const productRef = doc(db, 'productos', productId);
  await updateDoc(productRef, {
    stock: increment(-quantity)
  });
}