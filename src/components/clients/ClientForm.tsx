// src/components/clients/ClientForm.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Client } from '../../types/client';

type Props = {
    onSubmit: (clientData: Omit<Client, 'id' | 'createdAt'>) => void;
    initialData?: Client | null;
};

const ClientForm = ({ onSubmit, initialData }: Props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [prochaineEntretient, setProchaineEntretient] = useState(new Date());
    const [periodEntretient, setPeriodEntretient] = useState<number>(0);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPhone(initialData.phone);
            setProchaineEntretient(initialData.prochaineEntretient ? new Date(initialData.prochaineEntretient) : new Date());
            setPeriodEntretient(initialData.periodEntretient ?? 0);
        }
    }, [initialData]);

    const handleSave = () => {
        if (!name || !phone) {
            alert('Le nom et le téléphone sont requis.');
            return;
        }
        onSubmit({ name, phone, prochaineEntretient, periodEntretient });
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || prochaineEntretient;
        setShowDatePicker(Platform.OS === 'ios');
        setProchaineEntretient(currentDate);
    };

    return (
        <View>
            <TextInput style={styles.input} placeholder="Nom" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Téléphone" value={phone} onChangeText={setPhone} />
            <TextInput
                style={styles.input}
                placeholder="Période d'entretien (jours)"
                value={String(periodEntretient)}
                onChangeText={(text) => setPeriodEntretient(Number(text) || 0)}
                keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.libelleDate}>
                    Prochain entretien: {prochaineEntretient.toLocaleDateString()}
                </Text>
                <Button title="📅" onPress={() => setShowDatePicker(true)} />
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={prochaineEntretient}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
            <Button title={initialData ? 'Mettre à jour' : 'Ajouter'} onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    libelleDate: {
        marginVertical: 5,
        marginLeft: 0,
        marginRight: 10,
        flex: 1,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
    },
});

export default ClientForm;
