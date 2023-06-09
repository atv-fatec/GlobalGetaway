import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import React, { useState } from 'react';
import { db } from '../configs/index';

const CriarHoteisScreen = ({ route }) => {
    const navigation = useNavigation();

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
        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
        });
    };

    const editarDados = () => {
        const refDB = doc(db, `hoteis/${route?.params?.id}`);

        if (hotel.nome.length === 0) {
            setHotel((prevState) => ({ ...prevState, nome: route?.params?.nome }));
        }

        if (hotel.estado.length === 0) {
            setHotel((prevState) => ({ ...prevState, estado: route?.params?.estado }));
        }

        if (hotel.cidade.length === 0) {
            setHotel((prevState) => ({ ...prevState, cidade: route?.params?.cidade }));
        }

        if (hotel.rating === 0) {
            setHotel((prevState) => ({ ...prevState, rating: route?.params?.rating }));
        }

        updateDoc(refDB, {
            nome: hotel.nome || route?.params?.nome,
            estado: hotel.estado || route?.params?.estado,
            cidade: hotel.cidade || route?.params?.cidade,
            rating: hotel.rating || route?.params?.rating
        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                defaultValue={route?.params?.nome}
                onChangeText={(text) => setHotel({ ...hotel, nome: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Estado"
                defaultValue={route?.params?.estado}
                onChangeText={(text) => setHotel({ ...hotel, estado: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Cidade"
                defaultValue={route?.params?.cidade}
                onChangeText={(text) => setHotel({ ...hotel, cidade: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Classificação"
                defaultValue={route?.params?.rating}
                onChangeText={(text) => setHotel({ ...hotel, rating: text })}
            />

            {route?.params?.id
                ?
                <Button title="Editar" onPress={editarDados} style={styles.button} />
                :
                <Button title="Enviar" onPress={enviarDados} style={styles.button} />
            }
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