// clientService.ts
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Client } from "@/src/types/client";
import { db } from "@/src/config/firebaseConfig";

const clientsCollection = collection(db, "clients");

// 🔹 Ajouter un client
export const addClient = async (client : Client  ) => {
    
    const newClient = {
        ...client,
        name: client.name.trim(),
        phone: client.phone.trim(),
        createdAt: new Date()
    };
    await addDoc(clientsCollection, newClient);
};

// 🔹 Récupérer tous les clients
export const getClients = async () => {
  const querySnapshot = await getDocs(clientsCollection);
  let clients: any[] = [];
  querySnapshot.forEach((d) => {
    clients.push({ id: d.id, ...d.data() });
  });
  return clients;
};

// 🔹 Mettre à jour un client
export const updateClient = async (id: string, updates: any) => {
  const clientRef = doc(db, "clients", id);
  await updateDoc(clientRef, updates);
};

// 🔹 Supprimer un client
export const deleteClient = async (id: string) => {
  const clientRef = doc(db, "clients", id);
  await deleteDoc(clientRef);
};
