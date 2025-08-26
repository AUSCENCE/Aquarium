import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Client } from "@/src/types/client";
import { getClients } from "@/src/services/clientService";
import { Demande } from "@/src/types/demande";
import FormDemande from "@/src/components/Demande/FormDemande";

export const DemandeScreen = () => {
    const [demande, setDemande] = useState<Demande | null>(null);


    const handleNewDemande = (nouvelleDemande: Demande) => {
        setDemande(nouvelleDemande);
        console.log("Nouvelle demande reçue :", nouvelleDemande);
    };

    return (
        <View style={styles.container}>
            <FormDemande onSubmit={handleNewDemande} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40,
    },
});
