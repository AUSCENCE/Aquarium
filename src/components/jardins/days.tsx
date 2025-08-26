import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

const players = [
  { name: "LeBron James", pts: 0, reb: 1, ast: 1 },
  { name: "Anthony Davis", pts: 1, reb: 0, ast: 1 },
  { name: "Austin Reaves", pts: 1, reb: 1, ast: 1 },
  { name: "Kobe Bryant", pts: 1, reb: 1, ast: 0 },
];

const DayJardain = ()=>{

    const [filter, setFilter] = useState("");

    // Liste filtrée
    const filteredPlayers = players.filter((player) =>
        player.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (

    <View style={styles.container}>
        <View>
            <Text style={{ textAlign:"center", fontSize:20,fontWeight:"bold", paddingTop:15, paddingBottom:10 }}>Gazon du Jour</Text>
            <TextInput
                style={styles.input}
                placeholder="Recherche un client..."
                value={filter}
                onChangeText={setFilter}
            />
        </View>
        <ScrollView horizontal >
            <View style={styles.table}>
                {/* Header */}
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.cell, styles.headerCell, styles.playerCol]}>
                        Clients
                    </Text>
                    <Text style={[styles.cell, styles.headerCell]}>E</Text>
                    <Text style={[styles.cell, styles.headerCell]}>R</Text>
                    <Text style={[styles.cell, styles.headerCell]}>D</Text>

                </View>

                {/* Body */}
                {filteredPlayers.map((player, index) => (
                    <View
                        key={player.name}
                        style={[
                            styles.row,
                            index === filteredPlayers.length - 1 ? styles.lastRow : null,
                        ]}
                    >
                        <Text style={[styles.cell, styles.playerCol, styles.playerCell]}>
                            {player.name}
                        </Text>
                        <Text style={styles.cell}> 
                            {player.pts === 1 ? 
                                <Ionicons name="checkmark-circle" size={24} color="#006400" />
                            :
                                <Ionicons name="close-circle" size={24} color="#8B0000" />
                            }
                           
                        </Text>
                        <Text style={styles.cell}>
                            {player.reb === 1 ? 
                                <Ionicons name="checkmark-circle" size={24} color="#006400" />
                            :
                                <Ionicons name="close-circle" size={24} color="#8B0000" />
                            }
                        </Text>
                        <Text style={styles.cell}>
                            {player.ast === 1 ? 
                                <Ionicons name="checkmark-circle" size={24} color="#006400" />
                            :
                                <Ionicons name="close-circle" size={24} color="#8B0000" />
                            }
                        </Text>
                    </View>
                ))}
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.playerCol, styles.playerCell]}>
                            Taux de Reussite
                    </Text>
                    <Text style={styles.cell}>10</Text>
                    <Text style={styles.cell}>10</Text>
                    <Text style={styles.cell}>10</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.playerCol, styles.playerCell]}>
                            Moyenne du jour
                    </Text>
                    <Text style={styles.cellFull}>10</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.cell, styles.playerCol, styles.playerCell]}>
                            Quota du jour
                    </Text>
                    <Text style={styles.cellFull}>05</Text>
                </View>
            </View>
        </ScrollView>
    </View>
    )
} 

const styles = StyleSheet.create({
    container : {
         alignItems: "center", 
         justifyContent: "center"
    },
   
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: 300,
        margin: 10,

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
        width: 60, // largeur par défaut des cellules
    },
    cellFull: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        width: 180, // largeur par défaut des cellules
    },
    headerCell: {
        fontWeight: "bold",
        backgroundColor: "#1876B4FF",
        color: "#fff",
    },
    playerCol: {
        width: 140, // largeur spécifique pour la colonne des noms
    },
    playerCell: {
        fontWeight: "600",
        backgroundColor: "#f9f9f9",
    },
    lastRow: {
        borderBottomWidth: 0,
    },
});
export default DayJardain;