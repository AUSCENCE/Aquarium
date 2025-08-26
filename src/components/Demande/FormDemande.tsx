
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Demande } from "@/src/types/demande";
import { Client } from "@/src/types/client";
import { getClients } from "@/src/services/clientService";

type Props = {
    onSubmit: (demande: Demande) => void;
};

export const DemandeForm = ({ onSubmit }: Props) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [description, setDescription] = useState("");
    const [dateExecution, setDateExecution] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // ✅ Déclencher le chargement des clients une seule fois au montage du composant
    useEffect(() => {
        const loadClients = async () => {
            const data = await getClients();
            setClients(data);
        };
        loadClients();
    }, []); // Le tableau de dépendances vide []
     const loadClients = async () => {
            const data = await getClients();
            setClients(data);
        };
        loadClients();
    // Sélecteur de client
    const [open, setOpen] = useState(false);
    const [clientId, setClientId] = useState<string | null>(null);
    const [items, setItems] = useState<any[]>([]); // ✅ Initialiser avec un tableau vide

    // ✅ Mettre à jour les items lorsque l'état 'clients' change
    useEffect(() => {
        if (clients.length > 0) {
            setItems(clients.map((c) => ({ label: c.name, value: c.id })));
        }
    }, [clients]);

    const handleSubmit = () => {
        if (!clientId) {
            // Optionally, you can show an error or return early
            return;
        }
        const demande: Demande = {
            description,
            dateExecution,
            clientId,
            // Ajoutez d'autres champs requis par le type Demande si nécessaire
        };
        onSubmit(demande);
    };

    const onDateChange = (_event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || dateExecution;
        setShowDatePicker(Platform.OS === "ios");
        setDateExecution(currentDate);
    };

    return (

        <View style={{ padding: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                Nouvelle Demande
            </Text>

            {/* Sélecteur de client avec recherche */}
            <DropDownPicker
                open={open}
                value={clientId}
                items={items}
                setOpen={setOpen}
                setValue={setClientId as any} // ✅ obligé de caster car DropDownPicker attend une fonction spéciale
                setItems={setItems}
                searchable={true}
                placeholder="Sélectionner un client"
                containerStyle={{ marginBottom: 15 }}
            />

            <TextInput
                placeholder="Description de la demande"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 8,
                }}
            />

            {/* Sélection de la date */}
            <Button
                title="Choisir la date d'exécution"
                onPress={() => setShowDatePicker(true)}
            />
            <Text style={{ marginVertical: 10 }}>
                📅 {dateExecution.toLocaleDateString()}
            </Text>

            {showDatePicker && (
                <DateTimePicker
                    value={dateExecution}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            <Button title="Enregistrer la demande" onPress={handleSubmit} />
        </View>

    );
};

