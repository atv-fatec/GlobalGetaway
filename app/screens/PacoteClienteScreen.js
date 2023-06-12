import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Carrossel } from '../components/Carrossel';
import React, { useEffect, useState } from 'react';
import { useAuthentication } from '../hooks';
import { db } from '../configs';

const PacoteClienteScreen = () => {
    const { user } = useAuthentication()
    const navigate = useNavigation();
    const route = useRoute()

    const [allImgs, setAllImgs] = useState([])

    useEffect(() => {
        route.params.body.hotel.imgs.forEach((hts) => { setAllImgs((lastItem) => [...lastItem, hts]) })
        route.params.body.ponto.forEach(pts => pts.imgs.forEach(urls => setAllImgs((lastItem) => [...lastItem, urls])))
    }, [setAllImgs, route])

    const dateInicio = new Date(route.params.body?.inicio.seconds * 1000);
    const localeDateIncial = dateInicio.toLocaleDateString("pt-BR");
    const dateFinal = new Date(route.params.body?.final.seconds * 1000);
    const localDateFinal = dateFinal.toLocaleDateString("pt-BR");

    const wishList = async (pacote) => {
        const collect = doc(collection(db, "usuarios"), String(user?.uid));
        console.log(pacote)

        await updateDoc(collect, {
            wishList: arrayUnion({
                nome: pacote.nome,
                inicio: pacote.inicio,
                hotel: pacote.hotel,
                ponto: pacote.ponto,
                valor: pacote.valor,
                categorias: pacote.categorias,
                final: pacote.final,
            })
        })

        Alert.alert("Pacote salvo!",  "Pacote adicionado a lista de desejos." , [{text: "OK!", style: "cancel"}])
    }

    return (
        <>
            <ScrollView>
                <Carrossel arrayImages={allImgs} />

                <Text style={styles.title_ofc}>{route.params.body.nome}</Text>

                <View style={styles.box_ponto}>
                    <Text style={styles.title_ponto}>Pontos inclusos</Text>

                    <Text style={styles.list}>
                        {route.params.body.ponto.map((item, index) => (
                            <Text key={index}>
                                {index > 0 ? '\n' : ''}
                                &bull; {item.nome}
                            </Text>
                        ))}
                    </Text>
                </View>

                <View style={styles.box_ponto}>
                    <Text style={styles.title_ponto}>Data</Text>
                    <Text>{localeDateIncial} - {localDateFinal}</Text>
                </View>

                <View style={styles.box_ponto}>
                    <Text style={styles.title_ponto}>Hotel</Text>
                    <Text>
                        {route.params.body.hotel.nome}
                    </Text>
                </View>

                <View style={styles.box_ponto}>
                    <Text style={styles.title_ponto}>Categoria</Text>
                    {route.params.body.categorias.map((item, index) => (
                        <View style={styles.icone_categoria}>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.box_pacote}>
                    <View style={styles.row_pacote}>
                        <View style={styles.col_precopacote}>
                            <Text>Total:</Text>
                            <Text>R$ {route.params.body.valor}</Text>
                        </View>
                        <View style={styles.col_botaopacote}>
                            <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('Carrinho', { ...route.params.body })}>
                                <Text style={styles.buttonText}>Adquira agora!</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonwish} onPress={() => wishList({
                                id: route.params.id,
                                nome: route.params.body.nome,
                                inicio: route.params.body.inicio,
                                hotel: route.params.body.hotel,
                                ponto: route.params.body.ponto,
                                valor: route.params.body.valor,
                                categorias: route.params.body.categorias,
                                final: route.params.body.final,
                            })}>
                                <Text style={styles.buttonText}>Salvar!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        backgroundColor: "#D9D9D9",
    },
    title_ofc: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 10
    },
    title_ponto: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6
    },
    txt_ponto: {
        color: "#939393",
        marginTop: 4
    },
    box_ponto: {
        margin: 10
    },
    icone_categoria: {
        width: 110,
        backgroundColor: "#FD9B12",
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#46ADD6',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        width: '40%'
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    box_pacote: {
        flex: 1,
        margin: 10
    },

    row_pacote: {
        flexDirection: 'row',
    },

    col_precopacote: {
        width: '20%',
        margin: 5,
    },

    col_botaopacote: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        margin: 5,
    },

    buttonwish: {
        backgroundColor: '#FD9B12',
        width: '30%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },

    button: {
        backgroundColor: '#0D829B',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        width: '50%'
    },
})

export default PacoteClienteScreen;