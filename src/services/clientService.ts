// clientService.ts
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Client } from "../types/client";
import { db } from "../config/firebaseConfig";

const clientsCollection = collection(db, "clients");

// 🔹 Ajouter un client
export const addClient = async (client: Omit<Client, 'id'>) => {
    const newClient = {
        ...client,
        name: client.name.trim(),
        phone: client.phone.trim(),
        createdAt: new Date()
    };
    await addDoc(clientsCollection, newClient);
};

// 🔹 Récupérer tous les clients
export const getClients = async (): Promise<Client[]> => {
  const querySnapshot = await getDocs(clientsCollection);
  const clients: Client[] = [];
  querySnapshot.forEach((d) => {
    const data = d.data();
    clients.push({
        id: d.id,
        name: data.name,
        phone: data.phone,
        address: data.address,
        createdAt: data.createdAt?.toDate() // handle potential undefined value and convert timestamp
    });
  });
  return clients;
};

// 🔹 Mettre à jour un client
export const updateClient = async (id: string, updates: Partial<Client>) => {
  const clientRef = doc(db, "clients", id);
  await updateDoc(clientRef, updates);
};

// 🔹 Supprimer un client
export const deleteClient = async (id: string) => {
  const clientRef = doc(db, "clients", id);
  await deleteDoc(clientRef);
};
