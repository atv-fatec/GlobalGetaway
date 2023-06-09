import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import DropdownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";
import { db } from '../configs/index';

const CriarPacotesScreen = () => {
    const [data, setData] = useState();
    const [data2, setData2] = useState();

    const navigation = useNavigation();

    const findAllPostInStorage = useCallback(
        async () => {
            let postData = [];

            const collect = collection(db, "hoteis");

            const queryFilterDate = query(collect);

            const querySnapshot = await getDocs(queryFilterDate);

            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    postData.push({
                        id: doc.id,
                        body: doc.data(),
                    });
                });
            }

            setData(postData);
        },

        [setData]
    );

    const findAllPostInStorage2 = useCallback(
        async () => {
            let postData = [];

            const collect = collection(db, "pontos");

            const queryFilterDate = query(collect);

            const querySnapshot = await getDocs(queryFilterDate);

            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    postData.push({
                        id: doc.id,
                        body: doc.data(),
                    });
                });
            }

            setData2(postData);
        },

        [setData2]
    );

    useEffect(() => {
        findAllPostInStorage();
        findAllPostInStorage2();
    }, []);

    const namesP = data2?.map(item => ({ label: item?.body?.nome, value: item?.body.nome })) || [];
    const names = data?.map(item => ({ label: item?.body?.nome, value: item?.body.nome })) || [];

    const [pacote, setPacote] = useState({
        nome: '',
        valor: ''
    })

    const [openP, setOpenP] = useState(false);
    const [openH, setOpenH] = useState(false);
    const [open, setOpen] = useState(false);

    const [value, setValue] = useState([]);
    const [valueP, setValueP] = useState([]);
    const [valueH, setValueH] = useState(null);

    const [items, setItems] = useState([
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3' },
    ]);

    const enviarDados = async () => {
        await addDoc(collection(db, "pacotes"), {
            nome: pacote.nome,
            valor: pacote.valor,
            ponto: valueP,
            hotel: valueH,
            categorias: value,
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
        <>
            <ScrollView style={{height: '100%'}}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={pacote.nome}
                        onChangeText={(text) => setPacote({ ...pacote, nome: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Valor da passagem"
                        value={pacote.valor}
                        onChangeText={(text) => setPacote({ ...pacote, valor: text })}
                    />
                    <View style={{ zIndex: 1000 }}>
                        {namesP.length > 0 && (<DropdownPicker
                            style={styles.input}
                            schema={{ label: 'label', value: 'value' }}
                            multiple={true}
                            min={1}
                            max={50}
                            open={openP}
                            value={valueP}
                            items={namesP}
                            setOpen={setOpenP}
                            setValue={setValueP}
                            setItems={setItems}
                            absoluteRTLLayout={false}
                        />)}
                    </View>
                    <View style={{ zIndex: 950 }}>
                        {names.length > 0 && (<DropdownPicker
                            style={styles.input}
                            schema={{ label: 'label', value: 'value' }}
                            open={openH}
                            multiple={false}
                            max={1}
                            value={valueH}
                            items={names}
                            setOpen={setOpenH}
                            setValue={setValueH}
                            setItems={setItems}
                            zIndex={100}
                        />)}
                    </View>
                    <View style={{ zIndex: 900 }}>
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
                    </View>
                    <Button title="Enviar" onPress={enviarDados} />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: 700
    },

    input: {
        borderWidth: 2,
        borderColor: '#46ADD6',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
});

export default CriarPacotesScreen;