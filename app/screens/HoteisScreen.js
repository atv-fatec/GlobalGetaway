import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import React, { useState, useEffect, useCallback } from 'react';
import MenuScreen from '../components/Menu';
import { db } from '../configs/index';
import { AntDesign } from '@expo/vector-icons';

const HoteisScreen = ({ navigation }) => {
    const [data, setData] = useState();

    const [filteredData, setFilteredData] = useState([]);

    const [reloadKey, setReloadKey] = useState(0);

    const [openedMenu, setOpenedMenu] = useState(Array(data?.length).fill(false));

    const filterData = (searchText) => {
        const filtered = data.filter((item) => {
            const lowerCaseSearchText = searchText.toLowerCase();

            // Verifica se algum critério corresponde ao valor de pesquisa
            const nomeMatch = item.body.nome.toLowerCase().includes(lowerCaseSearchText);
            const ratingMatch = item.body.rating.toLowerCase().includes(lowerCaseSearchText);
            const estadoMatch = item.body.estado.toLowerCase().includes(lowerCaseSearchText);
            const cidadeMatch = item.body.cidade.toLowerCase().includes(lowerCaseSearchText);

            // Retorna true se algum critério corresponder
            return nomeMatch || ratingMatch || estadoMatch || cidadeMatch;
        });

        setFilteredData(filtered);
    };

    const handleReload = () => {
        setReloadKey((prevKey) => prevKey + 1); // Atualize o estado reloadKey para um novo valor
    };

    const handleMenuPress = (index) => {
        const updatedMenuState = [...openedMenu];

        updatedMenuState[index] = !updatedMenuState[index];

        setOpenedMenu(updatedMenuState);
    };

    const handleDelete = async (id) => {
        await DeletePonto(id);
    };

    const DeletePonto = async (id) => {
        const refDataBase = doc(db, `hoteis/${id}`);

        await deleteDoc(refDataBase, id);

        await findAllPostInStorage();
    };

    const findAllPostInStorage = useCallback(
        async () => {
            let postData = [];

            const collect = collection(db, "hoteis");

            const queryFilterDate = query(collect);

            const querySnapshot = await getDocs(queryFilterDate);

            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
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
    }, [findAllPostInStorage, reloadKey]);

    console.log(data);

    const criarHotel = () => {
        navigation.navigate('CriarHotel');
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.row}>
            <View style={styles.column}>
                <TouchableOpacity onPress={() => handleMenuPress(index)}>
                    <Text style={styles.text}>{index + 1}</Text>
                </TouchableOpacity>
                <MenuScreen key={index} menu={openedMenu[index]}
                    onMenuPress={() => handleMenuPress(index)}
                    onEdit={() => navigation.navigate('CriarHotel', {
                        id: item.id,
                        nome: item.body.nome,
                        cidade: item.body.cidade,
                        estado: item.body.estado,
                        rating: item.body.rating,
                        images: item.body.imgs,
                    })}
                    onDelete={() => handleDelete(item.id)}
                />
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.nome}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.cidade}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.text}>{item.body.estado}</Text>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisar"
                    onChangeText={filterData}
                    value={filteredData}
                />

                <TouchableOpacity onPress={criarHotel} style={styles.button}>
                    <Text style={styles.buttonText}>Novo +</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.refresh} onPress={handleReload}>
                    <AntDesign name="reload1" size={20} color="#0D404B" />
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
                        <Text style={styles.title}>Cidade</Text>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>Estado</Text>
                    </View>
                </View>

                <FlatList
                    data={filteredData.length > 0 ? filteredData : data}
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
        color: '#086063'
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
        borderColor: '#61C3C6',
        borderRadius: 5,
        paddingLeft: 10,
    },

    button: {
        width: '18%',
        backgroundColor: '#61C3C6',
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

export default HoteisScreen;