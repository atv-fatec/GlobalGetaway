import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../configs/index';

const HoteisScreen = ({ navigation }) => {
    const [data, setData] = useState();

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
    }, []);

    console.log(data);

    const criarHotel = () => {
        navigation.navigate('CriarHotel');
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.text}>{index + 1}</Text>
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
            <TouchableOpacity onPress={criarHotel} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

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
        borderBottomColor: '#ddd',
        paddingBottom: 10,
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },

    column: {
        flex: 1,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    text: {
        fontSize: 16,
    },

    button: {
        width: '15%',
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HoteisScreen;