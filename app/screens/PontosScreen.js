import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from 'react';
import MenuScreen from '../components/Menu';
import { db } from '../configs/index';

const PontosScreen = ({ navigation }) => {
    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [openedMenu, setOpenedMenu] = useState(Array(data?.length).fill(false));

    const handleMenuPress = (index) => {
        const updatedMenuState = [...openedMenu];

        updatedMenuState[index] = !updatedMenuState[index];

        setOpenedMenu(updatedMenuState);
    };

    const handleDelete = async (id) => {
        await DeletePonto(id);
    };

    const DeletePonto = async (id) => {
        const refDataBase = doc(db, `pontos/${id}`);

        await deleteDoc(refDataBase, id);

        await findAllPostInStorage();
    };

    const findAllPostInStorage = useCallback(
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

            setData(postData);
        },

        [setData]
    );

    useEffect(() => {
        findAllPostInStorage();
    }, []);

    const criarPonto = () => {
        navigation.navigate('CriarPonto');
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.row} key={index}>

            <View style={styles.column}>
                <TouchableOpacity onPress={() => handleMenuPress(index)}>
                    <Text style={styles.text}>{index + 1}</Text>
                </TouchableOpacity>

                <MenuScreen key={index} menu={openedMenu[index]}
                    onMenuPress={() => handleMenuPress(index)}
                    onEdit={() => navigation.navigate('CriarPonto', {
                        id: item.id,
                        nome: item.body.nome,
                        descricao: item.body.descricao,
                        categoria: item.body.categoria,
                        estado: item.body.estado,
                        cidade: item.body.cidade,
                    })}
                    onDelete={() => handleDelete(item.id)}
                />
            </View>

            <View style={styles.column}>    
                <Text style={styles.text}>{item.body.nome}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.categoria}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.estado}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.cidade}</Text>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar"
                    onChangeText={text => setSearch(text)}
                    value={search}
                />

                <TouchableOpacity onPress={criarPonto} style={styles.button}>
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
                        <Text style={styles.title}>Categoria</Text>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>Estado</Text>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>Cidade</Text>
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
    },

    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#88B7C2',
        paddingBottom: 10,
        marginBottom: 10,

    },

    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#A7BFC5',
        paddingVertical: 10,
    },

    column: {
        flex: 1,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#136341'
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
        borderColor: '#87DEB1',
        borderRadius: 5,
        paddingLeft: 10,
    },

    button: {
        width: '25%',
        backgroundColor: '#87DEB1',
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


export default PontosScreen;