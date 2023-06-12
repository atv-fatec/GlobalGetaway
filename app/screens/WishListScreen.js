import { arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { useAuthentication } from '../hooks';
import { db } from '../configs';

const WishListScreen = () => {
    const { user } = useAuthentication()

    const navigate = useNavigation();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [reloadKey, setReloadKey] = useState(0);

    const getUserInfo = useCallback(async (uid) => {
        const usuariosRef = collection(db, 'usuarios');
        const q = query(usuariosRef, where('id', '==', uid));

        try {
            const querySnapshot = await getDocs(q);
            const userData = [];

            querySnapshot.forEach((doc) => {
                userData.push(doc.data());
            });

            return userData;
        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error);
            return null;
        }
    }, []);

    useEffect(() => {
        if (user?.uid != null) {
            setLoading(true); // Define o estado de loading como true ao iniciar a consulta

            getUserInfo(user?.uid).then((userData) => {
                setData(userData);
            }).catch((error) => {
                console.error('Erro ao obter informações do usuário:', error);
            }).finally(() => {
                setLoading(false); // Define o estado de loading como false ao concluir a consulta
            });
        }
    }, [getUserInfo, user?.uid, reloadKey]);

    const handleReload = () => {
        setReloadKey((prevKey) => prevKey + 1); // Atualize o estado reloadKey para um novo valor
    };

    if (loading) {
        return (
            console.log('Carregando dados...')
        );
    }

    if (!data || data.length === 0) {
        return (
            console.log('Não há dados disponíveis para exibir.')
        )
    }

    return (
        <>
            <ScrollView>
                <View style={styles.containeropt}>
                    <TouchableOpacity style={styles.refresh} onPress={handleReload}>
                        <AntDesign name="reload1" size={20} color="#0D404B" />
                        <Text style={{ color: '#0D404B' }}> Atualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.refresh} onPress={() => navigate.navigate('Login')}>
                        <AntDesign name="logout" size={20} color="#0D404B" />
                        <Text style={{ color: '#0D404B' }}> Sair</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Text style={styles.info}>Viagens salvas</Text>
                    {data && data?.length > 0
                        ? data[0].wishList?.map((item, index) => {
                            return (
                                <View key={index} style={styles.itemContainer}>
                                    <Text>Nome do pacote: {item.nome}</Text>
                                    <Text>Data: {new Date(item.inicio.seconds * 1000).toLocaleDateString("pt-BR")} - {new Date(item.final.seconds * 1000).toLocaleDateString("pt-BR")}</Text>
                                    <Text>Valor: R$ {item.valor}{'\n'}</Text>


                                    <View style={styles.botaoopt}>
                                        <TouchableOpacity style={styles.refresh} onPress={() => navigate.navigate('PacoteCliente', { body: item })}>
                                            <AntDesign name="eye" size={20} color="#0D404B" />
                                            <Text style={{ color: '#0D404B' }}> Ver mais!</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.refresh} onPress={() => navigate.navigate('Carrinho', { ...item })}>
                                            <AntDesign name="shoppingcart" size={20} color="#0D404B" />
                                            <Text style={{ color: '#0D404B' }}> Comprar!</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {index !== data[0].wishList.length - 1 && <View style={styles.separator} />}
                                </View>
                            );
                        })
                        : <View style={styles.itemContainer}><Text>Não há dados disponíveis para exibir.</Text></View>
                    }
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    containeropt: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 310,
        alignItems: 'flex-start',
        left: 25,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#757575',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 11,
        borderRadius: 10,
        elevation: 5,
    },
    container: {
        width: 310,
        alignItems: 'flex-start',
        left: 25,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#757575',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 11,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 10,
    },
    refresh: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    info: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 24,
        color: '#0D404B',
    },
    itemContainer: {
        marginTop: 10, // Espaçamento superior entre os itens
        marginBottom: 10, // Espaçamento inferior entre os itens
    },
    separator: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.7, // Largura da linha de separação
        borderColor: 'gray', // Cor da linha de separação
    },
    botaoopt: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    }
});

export default WishListScreen;