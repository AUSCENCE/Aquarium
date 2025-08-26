import React, { useState } from "react";
import { View, Text, TextInput, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Demande } from "@/src/types/demande";
import { Client } from "@/src/types/client";


const DemandeForm: React.FC<{
    clients: Client[];
    onSubmit: (demande: Demande) => void;
}> = ({ clients, onSubmit }) => {
    const [description, setDescription] = useState("");
    const [dateExecution, setDateExecution] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Gestion du Select
    const [open, setOpen] = useState(false);
    const [clientId, setClientId] = useState<string | null>(null);
    const [items, setItems] = useState(
        clients.map((c) => ({ label: c.name, value: c.id }))
    );

    const handleSubmit = () => {
        if (!clientId || !description) return;

        const demande: Demande = {
            clientId,
            description,
            dateExecution,
            createdAt: new Date(),
        };

        onSubmit(demande);

        // Réinitialiser
        setClientId(null);
        setDescription("");
        setDateExecution(new Date());
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
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
                setValue={setClientId}
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

export default DemandeForm;
