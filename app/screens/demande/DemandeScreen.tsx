import { Alert, StyleSheet, View } from "react-native";
import { Demande } from "../../src/types/demande";
import FormDemande from "../../src/components/Demande/FormDemande";
import { addDemande } from "../../src/services/demandeService";

export const DemandeScreen = () => {
    const handleNewDemande = async (nouvelleDemande: Omit<Demande, 'id'>) => {
        try {
            await addDemande(nouvelleDemande);
            Alert.alert("Succès", "La demande a été enregistrée avec succès.");
            console.log("Nouvelle demande enregistrée :", nouvelleDemande);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la demande :", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de l'enregistrement de la demande.");
        }
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
