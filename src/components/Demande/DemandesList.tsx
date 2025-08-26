import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, Pressable, TouchableOpacity } from "react-native";
import { getDemandes } from "@/src/services/demandeService";
import { getClients } from "@/src/services/clientService";
import { Demande } from "@/src/types/demande";
import { Client } from "@/src/types/client";

const DemandesList = () => {
    const [demandes, setDemandes] = useState<Demande[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const demandesData = await getDemandes();
                setDemandes(demandesData);
                const clientsData = await getClients();
                setClients(clientsData);
            } catch (error) {
                console.error("Error fetching demandes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDemandes();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#1876B4FF" style={{ marginTop: 20 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", paddingTop: 15, paddingBottom: 10 }}>
                Liste des Demandes
            </Text>
            <ScrollView horizontal>
                <View style={styles.table}>
                    {/* Header */}
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Client</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 130 }]}>Date d'exécution</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 50 }]}>Voir</Text>
                    </View>

                    {/* Body */}
                    {demandes.map((demande, index) => (
                        <View key={demande.id} style={[styles.row, index === demandes.length - 1 ? styles.lastRow : null]}>
                            <Text style={[styles.cell, { width: 150 }]}>
                                {clients.find((c) => c.id === demande.clientId)?.name || "Inconnu"}
                            </Text>
                            <Text style={[styles.cell, { width: 130 }]}>{demande.dateExecution.toLocaleDateString()}</Text>

                            <TouchableOpacity onPress={()=>{alert(demande.description)}} style={[styles.cell, { width: 50 }]}>
                               <Text> 👁️ </Text>                                
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
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
    },
    headerCell: {
        fontWeight: "bold",
        backgroundColor: "#1876B4FF",
        color: "#fff",
    },
    lastRow: {
        borderBottomWidth: 0,
    },
});

export default DemandesList;
