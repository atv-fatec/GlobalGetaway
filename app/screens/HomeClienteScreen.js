import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from "@react-navigation/native";
import { db } from '../configs';

const HomeClienteScreen = () => {
    const navigate = useNavigation();

    const [pacote, setPacote] = useState();
    const [ponto, setPonto] = useState();

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

            setPacote(postData);
        },

        [setPacote]
    );

    const findAllPontoInStorage = useCallback(
        async () => {
            let values = [];

            const collect = collection(db, "pontos");

            const queryFilterDate = query(collect);

            const querySnapshot = await getDocs(queryFilterDate);

            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    values.push({
                        id: doc.id,
                        body: doc.data(),
                    });
                });
            }

            setPonto(values);
        },

        [setPonto]
    );

    useEffect(() => {
        findAllPostInStorage();

        findAllPontoInStorage();
    }, [findAllPostInStorage, findAllPontoInStorage]);


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigate.navigate('PontoCliente', { ...item })}>
            <View style={styles.box_ponto} >
                <Image style={styles.image} source={{ uri: item.body.imgs ? String(item.body.imgs[0].url) : null }} ></Image>
                <Text style={styles.title_ponto}>{item.body.nome}</Text>
                <Text style={styles.txt_ponto}></Text>
            </View>
        </TouchableOpacity>
    )

    const renderPacote = ({ item }) => (
        <TouchableOpacity onPress={() => navigate.navigate('PacoteCliente', { ...item })}>
            <View style={styles.box_pacote}>
                <View style={styles.row_pacote}>
                    <View style={styles.col_imgpacote}>
                        <Image style={styles.imagePacote} source={{ uri: String(item.body.hotel.imgs[0].url) }}></Image>
                    </View>

                    <View style={styles.col_txtpacote}>
                        <Text style={styles.title_pacote}>{item.body.nome}</Text>
                    </View>

                    <View style={styles.col_txtpacote}>
                        <Text style={styles.title_pacote}>R$ {item.body.valor}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

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

    const renderCategoria = ({ item }) => (
        <TouchableOpacity onPress={() => navigate.navigate('Categoria', { categoria: item.nomeCat })}>
            <View style={styles.icone_categoria}>
                <Text>{item.nomeCat}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <ScrollView>
                <View style={styles.screenContainer}>
                    <View style={styles.container}>
                        <FlatList
                            data={ponto}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}
                        />
                    </View>

                    <View style={styles.box_categorias}>
                        <Text style={styles.title_categoria}>Categorias</Text>
                        <View style={styles.box_categoria}>
                            <FlatList
                                data={categorias}
                                renderItem={renderCategoria}
                                keyExtractor={cat => cat.id}
                                horizontal={true}
                                showsHorizontalScrollIndicator={true}
                            />
                        </View>
                    </View>

                    <View style={styles.box_pacotes}>
                        <Text style={styles.title_categoria}>Pacotes</Text>

                        <FlatList
                            data={pacote}
                            renderItem={renderPacote}
                            keyExtractor={pac => pac.id}
                            horizontal={false}
                            showsVerticalScrollIndicator={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    box_ponto: {
        width: 137,
        height: 175,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingLeft: 8,
        paddingTop: 8,
        paddingRight: 8,
        margin: 10,
        marginLeft: 0,
        shadowColor: '#21768B',
        shadowOffset: {
            width: 10,
            height: 4,
        },
        shadowOpacity: '100%',
        shadowRadius: 20,
        elevation: 7,
    },
    container: {
        paddingLeft: 10,
    },
    image: {
        width: '100%',
        height: 100,
        backgroundColor: "#87DEB1",
        borderRadius: 10,
    },
    imagePacote: {
        width: 60,
        height: 60,
        backgroundColor: '#AAFA9B',
        borderRadius: 10,
    },
    title_ponto: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 6
    },
    title_pacote: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    txt_ponto: {
        color: "#939393",
        marginTop: 4
    },
    txt_pacote: {
        color: "#939393",
        width: '60%',
    },
    box_categorias: {
        marginTop: 5,
        paddingLeft: 8,
        paddingTop: 5,
    },
    title_categoria: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    box_categoria: {
        width: '100%',
        alignContent: 'center'
    },
    icone_categoria: {
        alignItems: 'center',
        width: 110,
        backgroundColor: "#61C3C6",
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        marginLeft: 0
    },
    box_pacotes: {
        margin: 5,
        padding: 8,
    },
    box_pacote: {
        width: '100%',
        backgroundColor: '#FFFF',
        height: 80,
        borderRadius: 10,
        marginRight: 5,
        marginTop: 10,
        padding: 5,
        flex: 1,
        shadowColor: '#21768B',
        shadowOffset: {
            width: 10,
            height: 4,
        },
        shadowOpacity: '100%',
        shadowRadius: 20,
        elevation: 7,
    },
    row_pacote: {
        flexDirection: 'row',
    },
    col_imgpacote: {
        width: 60,
        height: 60,
        margin: 5,
    },
    col_txtpacote: {
        width: 155,
        height: 60,
        margin: 5,
    },
    screenContainer: {
        backgroundColor: '#F6F7FB',
    }
});


export default HomeClienteScreen;