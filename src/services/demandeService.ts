// src/services/demandeService.ts
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Demande } from "../types/demande";
import { db } from "../config/firebaseConfig";

const demandesCollection = collection(db, "demandes");

// 🔹 Ajouter une demande
export const addDemande = async (demande: Omit<Demande, 'id'>) => {
    const newDemande = {
        ...demande,
        createdAt: new Date(),
        executed: false,
    };
    await addDoc(demandesCollection, newDemande);
};

// 🔹 Récupérer toutes les demandes
export const getDemandes = async (): Promise<Demande[]> => {
    const querySnapshot = await getDocs(demandesCollection);
    const demandes: Demande[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        demandes.push({
            id: doc.id,
            clientId: data.clientId,
            description: data.description,
            dateExecution: data.dateExecution.toDate(),
            executed: data.executed,
            montant: data.montant,
            createdAt: data.createdAt.toDate(),
        });
    });
    return demandes;
};
