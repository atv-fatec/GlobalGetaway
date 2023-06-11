import { collection, addDoc, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useState, useEffect, useCallback } from 'react';
import DropdownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";
import { db } from '../configs/index';
import { uuidv4 } from "@firebase/util";

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

    const [dateInicial, setDateInicial] = useState(route?.params?.inicio || new Date());
    const [dateFinal, setDateFinal] = useState(route?.params?.final || new Date());

    const [openP, setOpenP] = useState(false);
    const [openH, setOpenH] = useState(false);
    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(route?.params?.categorias || []);
    const [valueP, setValueP] = useState(route?.params?.ponto || []);
    const [valueH, setValueH] = useState(route?.params?.hotel || {});

    const [items, setItems] = useState([
        { label: 'Item 1', value: 'item1' },
        { label: 'Item 2', value: 'item2' },
        { label: 'Item 3', value: 'item3' },
    ]);

    const onChangeInicio = (event, selectedDate) => {
        const currentDate = selectedDate || dateInicial;
        setDateInicial(selectedDate);
    };

    const showModeInicial = (currentMode) => {
        DateTimePickerAndroid.open({
            value: new Date(dateInicial),
            onChange: onChangeInicio,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const onChangeFinal = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateFinal(currentDate);
    };

    const showModeFinal = (currentMode) => {
        DateTimePickerAndroid.open({
            value: new Date(dateFinal),
            onChange: onChangeFinal,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepickerPrimeiro = () => {
        showModeInicial('date');
    };

    const showDatepickerFinal = () => {
        showModeFinal('date');
    };

    const enviarDados = async () => {
        await addDoc(collection(db, "pacotes"), {
            id: uuidv4(),
            nome: pacote.nome,
            valor: pacote.valor,
            ponto: valueP,
            hotel: valueH,
            categorias: value,
            inicio: dateInicial,
            final: dateFinal
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

        if (dateInicial === null) {
            setDateInicial(route?.params?.inicio)
        }

        if (dateFinal === null) {
            setDateFinal(route?.params?.final)
        }

        updateDoc(refDB, {
            nome: pacote.nome || route?.params?.nome,
            valor: pacote.valor || route?.params?.valor,
            ponto: valueP || route?.params?.ponto,
            hotel: valueH || route?.params?.hotel,
            categorias: value || route?.params?.categorias,
            inicio: dateInicial || route?.params?.inicio,
            final: dateFinal || route?.params?.final
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
                    <Text style={styles.label}>Nome</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Insira o nome do pacote"
                        defaultValue={route?.params?.nome}
                        onChangeText={(text) => setPacote({ ...pacote, nome: text })}
                    />

                    <Text style={styles.label}>Valor do Pacote</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Insira o valor do pacote"
                        defaultValue={route?.params?.valor}
                        keyboardType="numeric"
                        onChangeText={(text) => setPacote({ ...pacote, valor: text })}
                    />

                    <Text style={styles.label}>Pontos Turísticos</Text>

                    <View style={{ zIndex: 1000 }}>
                        {namesP.length > 0 && (<DropdownPicker
                            style={styles.input}
                            schema={{ label: 'label', value: 'value' }}
                            placeholder="Selecione os pontos turísticos do pacote"
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

                    <Text style={styles.label}>Hotel</Text>

                    <View style={{ zIndex: 950 }}>
                        {names.length > 0 && (<DropdownPicker
                            style={styles.input}
                            schema={{ label: 'label', value: 'value' }}
                            placeholder="Selecione o hotel do pacote"
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

                    <Text style={styles.label}>Categorias</Text>

                    <View style={{ zIndex: 900 }}>
                        <DropdownPicker
                            style={styles.input}
                            schema={{ label: 'label', value: 'value' }}
                            placeholder="Selecione as categorias do pacote"
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
                        null
                        :
                        <>
                            <Text style={styles.label}>Datas do Pacote</Text>

                            <View style={styles.dataContainer}>
                                <View style={styles.data} >
                                    <Button onPress={showDatepickerPrimeiro} title="Data Inicial" style={styles.data} />
                                </View>

                                <View style={styles.data} >
                                    <Button onPress={showDatepickerFinal} title="Data Final" />
                                </View>
                            </View>
                        </>
                    }


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

    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    data: {
        marginVertical: 10,
        alignSelf: 'flex-start',
    },

    label: {
        alignSelf: 'flex-start',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 24,
        marginTop: 10,
        color: '#0D404B',
    },
});

export default CriarPacotesScreen;