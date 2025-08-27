// src/services/entretienService.ts
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Entretien } from "../types/entretien";
import { db } from "../config/firebaseConfig";

const entretiensCollection = collection(db, "entretiens");

// 🔹 Ajouter un entretien
export const addEntretien = async (entretien: Omit<Entretien, 'id'>) => {
    const newEntretien = {
        ...entretien,
        createdAt: new Date(),
    };
    await addDoc(entretiensCollection, newEntretien);
};

// 🔹 Récupérer tous les entretiens
export const getEntretiens = async (): Promise<Entretien[]> => {
    const querySnapshot = await getDocs(entretiensCollection);
    const entretiens: Entretien[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        entretiens.push({
            id: doc.id,
            clientId: data.clientId,
            date: data.date.toDate(),
            createdAt: data.createdAt.toDate(),
        });
    });
    return entretiens;
};
