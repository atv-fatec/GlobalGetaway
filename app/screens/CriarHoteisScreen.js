import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../configs/index';

const CriarHoteisScreen = () => {
    const [hotel, setHotel] = useState({
        nome: '',
        estado: '',
        cidade: '',
        rating: 0
    });

    const enviarDados = async () => {
        await addDoc(collection(db, "hoteis"), {
            nome: hotel.nome,
            estado: hotel.estado,
            cidade: hotel.cidade,
            rating: hotel.rating
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={hotel.nome}
                onChangeText={(text) => setHotel({ ...hotel, nome: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={hotel.estado}
                onChangeText={(text) => setHotel({ ...hotel, estado: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={hotel.cidade}
                onChangeText={(text) => setHotel({ ...hotel, cidade: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Classificação"
                value={hotel.rating}
                onChangeText={(text) => setHotel({ ...hotel, rating: text })}
            />

            <Button title="Enviar" onPress={enviarDados} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    input: {
        borderWidth: 2,
        borderColor: '#61C3C6',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
});

export default CriarHoteisScreen;