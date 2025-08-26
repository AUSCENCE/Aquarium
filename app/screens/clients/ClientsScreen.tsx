import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addClient, deleteClient, getClients, updateClient } from "@/src/services/clientService";

import { Client } from '@/src/types/client';


const ClientsScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [prochaineEntretient, setProchaineEntretient] = useState<Date>(new Date());
  const [periodEntretient, setPeriodEntretient] = useState<number | null>(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clients, setClients] = useState<Client[]>([]); 
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  const handleSave = async () => {
    if (!name || !phone ) return


    if (editId) {
      await updateClient(editId, { name, phone });
      setEditId(null);
    } else {

      let newClient: Client = { name, phone };
      await addClient(newClient);

    }
    setName(""); setPhone("")
    loadClients();
  };

  const handleEdit = (client:Client) => {
    setEditId(client.id || "");
    setName(client.name);
    setPhone(client.phone);
  };

  const handleDelete = async (id: string) => {
    await deleteClient(id);
    loadClients();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || prochaineEntretient;
    setShowDatePicker(Platform.OS === "ios");
    setProchaineEntretient(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Clients</Text>

      <TextInput style={styles.input} placeholder="Nom" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Téléphone" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Nbre Entretient/mois"
                 value={periodEntretient ? String(periodEntretient) : ""}
                 onChangeText={(text) => setPeriodEntretient(Number(text))}
                 keyboardType="numeric" />

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Text style={styles.libelleDate}>
          {prochaineEntretient.toLocaleDateString()}
        </Text>
        <Button  title="📅" onPress={() => setShowDatePicker(true)} />

      </View>
      {showDatePicker && (
        <DateTimePicker
          value={prochaineEntretient}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Button title={editId ? "Mettre à jour" : "Ajouter"} onPress={handleSave} />

      
      <FlatList style={{ marginTop: 20 }}
        data={clients}
        keyExtractor={(item) => item.id ?? ""}
        renderItem={({ item }) => (
          <View style={styles.clientRow}>
            <Text style={styles.clientText}>
              {item.name} {"\n"} {item.phone}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id ?? "")}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      marginTop: 40
  },
  libelleDate: {
      marginVertical: 5,
      marginLeft:0,
      marginRight:10,
      width: 275,
      fontSize:16,
      borderColor:"#ccc",
      borderWidth:1,
      padding:10,
      borderRadius:8
  },
  title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10
  },
  input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      borderRadius: 8
  },
  clientRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee"
  },
  clientText: {
      fontSize: 16
  },
  actions: {
      flexDirection: "row",
      gap: 10
  },
  edit: {
      color: "blue",
      fontSize: 18,
      marginRight: 15
  },
  delete: {
      color: "red",
      fontSize: 18
  },
});
export default ClientsScreen;