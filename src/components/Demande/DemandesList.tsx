import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { getDemandes } from "../../services/demandeService";
import { Demande } from "../../types/demande";

const DemandesList = () => {
    const [demandes, setDemandes] = useState<Demande[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDemandes = async () => {
            try {
                const demandesData = await getDemandes();
                setDemandes(demandesData);
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
                        <Text style={[styles.cell, styles.headerCell, { width: 200 }]}>Client ID</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 300 }]}>Description</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Date d'exécution</Text>
                    </View>

                    {/* Body */}
                    {demandes.map((demande, index) => (
                        <View key={demande.id} style={[styles.row, index === demandes.length - 1 ? styles.lastRow : null]}>
                            <Text style={[styles.cell, { width: 200 }]}>{demande.clientId}</Text>
                            <Text style={[styles.cell, { width: 300 }]}>{demande.description}</Text>
                            <Text style={[styles.cell, { width: 150 }]}>{demande.dateExecution.toLocaleDateString()}</Text>
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
