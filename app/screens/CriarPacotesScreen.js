import { collection, addDoc, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import DropdownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";
import { db } from '../configs/index';

const CriarPacotesScreen = ({ route }) => {
    const navigation = useNavigation();

    const [data, setData] = useState();
    const [data2, setData2] = useState();

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

    const namesP = data2?.map(item => ({ label: item?.body?.nome, value: item?.body })) || [];
    const names = data?.map(item => ({ label: item?.body?.nome, value: item?.body })) || [];

    const [pacote, setPacote] = useState({
        nome: '',
        valor: ''
    })

    const [openP, setOpenP] = useState(false);
    const [openH, setOpenH] = useState(false);
    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(route?.params?.categorias || []);
    const [valueP, setValueP] = useState(route?.params?.ponto || []);
    const [valueH, setValueH] = useState(route?.params?.hotel || null);

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

    const editarDados = () => {
        const refDB = doc(db, `pacotes/${route?.params?.id}`)

        if (pacote.nome.length === 0) {
            setPacote((prevState) => ({ ...prevState, nome: route?.params?.nome }));
        }

        if (pacote.valor.length === 0) {
            setPacote((prevState) => ({ ...prevState, valor: route?.params?.valor }));
        }

        if (valueP === []) {
            setValueP(route?.params?.ponto)
        }

        if (valueH === null) {
            setValueH(route?.params?.hotel)
        }

        if (value === []) {
            setValue(route?.params?.categorias)
        }

        updateDoc(refDB, {
            nome: pacote.nome || route?.params?.nome,
            valor: pacote.valor || route?.params?.valor,
            ponto: valueP || route?.params?.ponto,
            hotel: valueH || route?.params?.hotel,
            categorias: value || route?.params?.categorias,
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
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        defaultValue={route?.params?.nome}
                        onChangeText={(text) => setPacote({ ...pacote, nome: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Valor da passagem"
                        defaultValue={route?.params?.valor}
                        keyboardType="numeric"
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

                    {route?.params?.id
                        ?
                        <Button title="Editar" onPress={editarDados} style={styles.button} />
                        :
                        <Button title="Enviar" onPress={enviarDados} style={styles.button} />
                    }
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