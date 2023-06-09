import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { db } from '../configs/index';

const CriarPontoScreen = ({ route }) => {
    const navigation = useNavigation()

    const [ponto, setPonto] = useState({
        nome: '',
        descricao: '',
        estado: '',
        cidade: '',
    });

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(route?.params?.categoria || []);

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

    const editarDados = () => {
        const refDB = doc(db, `pontos/${route?.params?.id}`)

        if (ponto.nome.length === 0) {
            setPonto((prevState) => ({ ...prevState, nome: route?.params?.nome }));
        }

        if (ponto.descricao.length === 0) {
            setPonto((prevState) => ({ ...prevState, descricao: route?.params?.descricao }));
        }

        if (ponto.estado.length === 0) {
            setPonto((prevState) => ({ ...prevState, estado: route?.params?.estado }));
        }

        if (ponto.cidade.length === 0) {
            setPonto((prevState) => ({ ...prevState, cidade: route?.params?.cidade }));
        }

        if (value === []) {
            setValue(route?.params?.categoria)
        }

        updateDoc(refDB, {
            nome: ponto.nome || route?.params?.nome,
            descricao: ponto.descricao || route?.params?.descricao,
            categoria: value || route?.params?.categoria,
            estado: ponto.estado || route?.params?.estado,
            cidade: ponto.cidade || route?.params?.cidade,
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
        <ScrollView>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    defaultValue={route?.params?.nome}
                    onChangeText={(text) => setPonto({ ...ponto, nome: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    defaultValue={route?.params?.descricao}
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
                    defaultValue={route?.params?.estado}
                    onChangeText={(text) => setPonto({ ...ponto, estado: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    defaultValue={route?.params?.cidade}
                    onChangeText={(text) => setPonto({ ...ponto, cidade: text })}
                />


                {route?.params?.id
                    ?
                    <Button title="Editar" onPress={editarDados} style={styles.button} />
                    :
                    <Button title="Enviar" onPress={enviarDados} style={styles.button} />
                }
            </View>
        </ScrollView>
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