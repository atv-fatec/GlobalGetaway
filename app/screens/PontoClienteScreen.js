import React from 'react';
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Carrossel } from '../components/Carrossel';

const PontoClienteScreen = () => {
    const navigate = useNavigation();
    const route = useRoute()

    console.log(route.params.body.imgs)

    return (
        <>
            <ScrollView style={styles.screenContainer}>
                <View style={styles.screenContainer}>
                    <Carrossel arrayImages={route.params.body.imgs}/>

                    <Text style={styles.title_ofc}>{route.params.body.nome}</Text>

                    <View style={styles.box_ponto}>
                        <Text style={styles.title_ponto}>Descrição</Text>
                        <Text style={styles.txt_ponto}>{route.params.body.descricao}</Text>
                        <Text style={styles.txt_ponto}>{route.params.body.cidade}, {route.params.body.estado}</Text>
                    </View>

                    <View style={styles.box_ponto}>
                        <Text style={styles.title_ponto}>Categoria</Text>

                        {route.params.body.categoria.map((item, index) => (
                            <View style={styles.icone_categoria}>
                                <Text>{route.params.body.categoria[index]}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.box_ponto} >
                        <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('PacotesPorPonto', { ...route.params })}>
                            <Text style={styles.buttonText}>Veja os pacotes</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#0D829B',
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
    screenContainer: {
        backgroundColor: '#F6F7FB',
        height: '80%',
    }
})

export default PontoClienteScreen;