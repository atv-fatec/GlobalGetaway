import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../configs/index';
import MenuScreen from '../components/Menu';
import Menu from '../components/Menu';


const PacotesScreen = ({ navigation }) => {
    const [data, setData] = useState();

    const [openedMenu, setOpenedMenu] = useState(Array(data?.length).fill(false));

    const findAllPostInStorage = useCallback(
        async () => {
            let postData = [];

            const collect = collection(db, "pacotes");

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

    const handleMenuPress = (index) => {
        const updatedMenuState = [...openedMenu];

        updatedMenuState[index] = !updatedMenuState[index];

        setOpenedMenu(updatedMenuState);
    };

    const handleDelete = async (id) => {
        await DeletePonto(id);
    };

    const DeletePonto = async (id) => {
        const refDataBase = doc(db, `pacotes/${id}`);

        await deleteDoc(refDataBase, id);

        await findAllPostInStorage();
    };

    useEffect(() => {
        findAllPostInStorage();
    }, []);

    const criarPacote = () => {
        navigation.navigate('CriarPacote');
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.row} key={index}>
            <View style={styles.column}>
                <TouchableOpacity onPress={() => handleMenuPress(index)}>
                    <Text style={styles.text}>{index + 1}</Text>
                </TouchableOpacity>
                
                <MenuScreen key={index} menu={openedMenu[index]}
                    onMenuPress={() => handleMenuPress(index)}
                    onDelete={() => handleDelete(item.id)}
                />
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.nome}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.valor}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.hotel}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.ponto}</Text>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar"
                />

                <TouchableOpacity onPress={criarPacote} style={styles.button}>
                    <Text style={styles.buttonText}>Novo +</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.column}>
                        <Text style={styles.title}>ID</Text>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>Nome</Text>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>Passagem</Text>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>Hotel</Text>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>Ponto turístico</Text>
                    </View>
                </View>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        width: 'auto'
    },

    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#88B7C2',
        paddingBottom: 10,
        marginBottom: 10,
        width: 'auto'
    },

    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#A7BFC5',
        paddingVertical: 10,
        flex: 1,
    },

    column: {
        flex: 1,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#145B79'
    },

    text: {
        fontSize: 16,
        color: '#436776'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    input: {
        width: '70%',
        height: 40,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#46ADD6',
        borderRadius: 5,
        paddingLeft: 10,
    },

    button: {
        width: '25%',
        backgroundColor: '#46ADD6',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PacotesScreen;