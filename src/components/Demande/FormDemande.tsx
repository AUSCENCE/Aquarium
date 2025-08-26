import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { Demande } from "../../types/demande";
import { Client } from "../../types/client";
import { getClients } from "../../services/clientService";

type Props = {
    onSubmit: (demande: Omit<Demande, 'id'>) => void;
};

const FormDemande = ({ onSubmit }: Props) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [description, setDescription] = useState("");
    const [dateExecution, setDateExecution] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        const loadClients = async () => {
            const data = await getClients();
            setClients(data);
        };
        loadClients();
    }, []);

    const [open, setOpen] = useState(false);
    const [clientId, setClientId] = useState<string | null>(null);
    const [items, setItems] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        if (clients.length > 0) {
            setItems(clients.map((c) => ({ label: c.name, value: c.id })));
        }
    }, [clients]);

    const handleSubmit = () => {
        if (!clientId) {
            return;
        }
        const demande: Omit<Demande, 'id'> = {
            description,
            dateExecution,
            clientId,
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

export default FormDemande;
