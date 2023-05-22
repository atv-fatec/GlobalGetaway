import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../configs/index';
import { ref } from 'firebase/storage';
import { get } from 'firebase/database';

const EditarPontoScreen = () => {
    const [ponto, setPonto] = useState({
        nome: '',
        categoria: '',
        estado: '',
        cidade: '',
    });

    useEffect(() => {
        const refDB = ref(db, `pontos/${route.params.id}`)

        get(refDB).then((ponto) => {
            if (ponto.exists()) {
                setPonto(ponto.data())
            }
        })
        
    }, [route.params.id])

    const updatePonto = () => {
        const refDB = ref(db, `pontos/${route.params.id}`)

        update(refDB, {
            nome: ponto.nome,
            categoria: ponto.categoria,
            estado: ponto.estado,
            cidade: ponto.cidade,
        })
    }

    const enviarDados = async () => {
        await addDoc(collection(db, "pontos"), {
            nome: ponto.nome,
            categoria: ponto.categoria,
            estado: ponto.estado,
            cidade: ponto.cidade,
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={ponto.nome}
                onChangeText={(text) => setPonto({ ...ponto, nome: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Categoria"
                value={ponto.categoria}
                onChangeText={(text) => setPonto({ ...ponto, categoria: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={ponto.estado}
                onChangeText={(text) => setPonto({ ...ponto, estado: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={ponto.cidade}
                onChangeText={(text) => setPonto({ ...ponto, cidade: text })}
            />

            <Button title="Enviar" onPress={enviarDados} style={styles.button}/>
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
        borderColor: '#87DEB1',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
});

export default EditarPontoScreen;