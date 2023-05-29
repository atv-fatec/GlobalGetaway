import { View, TextInput, Button, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { db } from '../configs/index';

const CriarPontoScreen = () => {
    const [ponto, setPonto] = useState({
        nome: '',
        descricao: '',
        estado: '',
        cidade: '',
    });

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState([]);

    const navigation = useNavigation()

    const enviarDados = async () => {
        await addDoc(collection(db, "pontos"), {
            nome: ponto.nome,
            descricao: ponto.descricao,
            categoria: value,
            estado: ponto.estado,
            cidade: ponto.cidade,
        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
        });
    }

    const categorias = [
        {
            nomeCat: 'Lazer',
        },
        {
            nomeCat: 'Cultura',
        },
        {
            nomeCat: 'Gastronomia',
        },
        {
            nomeCat: 'Arquitetura',
        },
        {
            nomeCat: 'Religião',
        },
        {
            nomeCat: 'Compras',
        },
    ];

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
                placeholder="Descrição"
                value={ponto.descricao}
                onChangeText={(text) => setPonto({ ...ponto, descricao: text })}
            />

            <DropdownPicker
                style={styles.input}
                schema={{ label: 'label', value: 'value' }}
                multiple={true}
                min={1}
                max={50}
                open={open}
                value={value}
                items={categorias?.map(item => ({ label: item?.nomeCat, value: item?.nomeCat })) || []}
                setOpen={setOpen}
                setValue={setValue}
                zIndex={100}
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

            <Button title="Enviar" onPress={enviarDados} style={styles.button} />
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

export default CriarPontoScreen;