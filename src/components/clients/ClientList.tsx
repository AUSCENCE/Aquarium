// src/components/clients/ClientList.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Client } from '../../types/client';

type Props = {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
};

const ClientList = ({ clients, onEdit, onDelete }: Props) => {
    return (
        <FlatList
            style={{ marginTop: 20 }}
            data={clients}
            keyExtractor={(item) => item.id ?? ''}
            renderItem={({ item }) => (
                <View style={styles.clientRow}>
                    <Text style={styles.clientText}>
                        {item.name} {"\n"} {item.phone}
                    </Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => onEdit(item)}>
                            <Text style={styles.edit}>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDelete(item.id ?? '')}>
                            <Text style={styles.delete}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    clientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    clientText: {
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    edit: {
        color: 'blue',
        fontSize: 18,
        marginRight: 15,
    },
    delete: {
        color: 'red',
        fontSize: 18,
    },
});

export default ClientList;
