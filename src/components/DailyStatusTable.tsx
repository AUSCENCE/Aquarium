import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { getClients, updateClient } from "../../services/clientService";
import { getDemandes } from "../../services/demandeService";
import { addEntretien, getEntretiens } from "../../services/entretienService";
import { Client } from "../../types/client";
import { Demande } from "../../types/demande";
import { Entretien } from "../../types/entretien";

const DailyStatusTable = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [demandes, setDemandes] = useState<Demande[]>([]);
    const [entretiens, setEntretiens] = useState<Entretien[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [clientsData, demandesData, entretiensData] = await Promise.all([
                getClients(),
                getDemandes(),
                getEntretiens(),
            ]);
            setClients(clientsData);
            setDemandes(demandesData);
            setEntretiens(entretiensData);
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Erreur", "Impossible de charger les données.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLogMaintenance = async (client: Client) => {
        if (!client.id || !client.periodEntretient) {
            Alert.alert("Erreur", "Données client incomplètes pour planifier le prochain entretien.");
            return;
        }

        try {
            // 1. Log the new maintenance
            await addEntretien({
                clientId: client.id,
                date: new Date(),
            });

            // 2. Calculate the next maintenance date
            const newMaintenanceDate = new Date();
            newMaintenanceDate.setDate(newMaintenanceDate.getDate() + client.periodEntretient);

            // 3. Update the client's record
            await updateClient(client.id, { prochaineEntretient: newMaintenanceDate });

            Alert.alert("Succès", "Entretien enregistré et prochaine date mise à jour.");
            // 4. Refresh data
            fetchData();

        } catch (error) {
            console.error("Error logging maintenance:", error);
            Alert.alert("Erreur", "Impossible d'enregistrer l'entretien.");
        }
    };

    const isMaintenanceOverdue = (client: Client): boolean => {
        if (!client.prochaineEntretient) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextMaintenanceDate = new Date(client.prochaineEntretient);
        nextMaintenanceDate.setHours(0, 0, 0, 0);

        if (nextMaintenanceDate > today) return false;

        const maintenanceDone = entretiens.some(e =>
            e.clientId === client.id &&
            new Date(e.date) >= nextMaintenanceDate
        );

        return !maintenanceDone;
    };

    const hasOverdueDemande = (client: Client): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return demandes.some(d =>
            d.clientId === client.id &&
            !d.executed &&
            new Date(d.dateExecution) < today
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#1876B4FF" style={{ marginTop: 20 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", paddingTop: 15, paddingBottom: 10 }}>
                Gazon du Jour
            </Text>
            <ScrollView horizontal>
                <View style={styles.table}>
                    {/* Header */}
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell, styles.playerCol]}>Clients</Text>
                        <Text style={[styles.cell, styles.headerCell]}>E</Text>
                        <Text style={[styles.cell, styles.headerCell]}>R</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Fait</Text>
                    </View>

                    {/* Body */}
                    {clients.map((client, index) => (
                        <View key={client.id} style={[styles.row, index === clients.length - 1 ? styles.lastRow : null]}>
                            <Text style={[styles.cell, styles.playerCol, styles.playerCell]}>{client.name}</Text>
                            <Text style={styles.cell}>
                                {isMaintenanceOverdue(client) ?
                                    <Ionicons name="close-circle" size={24} color="#8B0000" /> :
                                    <Ionicons name="checkmark-circle" size={24} color="#006400" />
                                }
                            </Text>
                            <Text style={styles.cell}>
                                {hasOverdueDemande(client) ?
                                    <Ionicons name="close-circle" size={24} color="#8B0000" /> :
                                    <Ionicons name="checkmark-circle" size={24} color="#006400" />
                                }
                            </Text>
                            <TouchableOpacity style={styles.cell} onPress={() => handleLogMaintenance(client)}>
                                <Ionicons name="construct" size={24} color="#1876B4FF" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
         alignItems: "center",
         justifyContent: "center"
    },
    table: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        overflow: "hidden",
        margin: 10,
    },
    row: {
        flexDirection: "row",
    },
    headerRow: {
        backgroundColor: "#f0f0f0",
    },
    cell: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCell: {
        fontWeight: "bold",
        backgroundColor: "#1876B4FF",
        color: "#fff",
    },
    playerCol: {
        width: 140,
    },
    playerCell: {
        fontWeight: "600",
        backgroundColor: "#f9f9f9",
    },
    lastRow: {
        borderBottomWidth: 0,
    },
});

export default DailyStatusTable;
