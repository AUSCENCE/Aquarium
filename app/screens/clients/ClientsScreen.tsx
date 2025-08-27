// app/screens/clients/ClientsScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Client } from '../../src/types/client';
import { getClients, addClient, updateClient, deleteClient } from '../../src/services/clientService';
import ClientList from '../../src/components/clients/ClientList';
import ClientForm from '../../src/components/clients/ClientForm';

const ClientsScreen = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const loadClients = useCallback(async () => {
        try {
            const data = await getClients();
            setClients(data);
        } catch (error) {
            Alert.alert("Erreur", "Impossible de charger les clients.");
        }
    }, []);

    useEffect(() => {
        loadClients();
    }, [loadClients]);

    const handleFormSubmit = async (clientData: Omit<Client, 'id' | 'createdAt'>) => {
        try {
            if (editingClient) {
                await updateClient(editingClient.id!, clientData);
            } else {
                await addClient(clientData);
            }
            setEditingClient(null); // Reset form
            loadClients(); // Refresh list
        } catch (error) {
            Alert.alert("Erreur", "Impossible d'enregistrer le client.");
        }
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirmer la suppression",
            "Êtes-vous sûr de vouloir supprimer ce client ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    onPress: async () => {
                        try {
                            await deleteClient(id);
                            loadClients(); // Refresh list
                        } catch (error) {
                            Alert.alert("Erreur", "Impossible de supprimer le client.");
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestion des Clients</Text>
            <ClientForm
                onSubmit={handleFormSubmit}
                initialData={editingClient}
            />
            <ClientList
                clients={clients}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default ClientsScreen;
