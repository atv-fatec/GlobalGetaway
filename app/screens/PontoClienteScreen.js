import React from 'react';
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const PontoClienteScreen = () => {
    const navigate = useNavigation();
    const route = useRoute()
    
    return (
        <>
            <ScrollView style={styles.screenContainer}>
                <View style={styles.screenContainer}>
                    <Image style={styles.image}></Image>
                    <View style={styles.box_ponto}>
                        <Text style={styles.title_ponto}>Descrição - {route.params.body.nome}</Text>
                        <Text style={styles.txt_ponto}>{route.params.body.descricao}</Text>
                        <Text style={styles.txt_ponto}>{route.params.body.cidade}, {route.params.body.estado}</Text>
                    </View>

                    <View style={styles.box_ponto}>
                        <Text style={styles.title_ponto}>Categoria</Text>
                        <View style={styles.icone_categoria}>
                            <Text>{route.params.body.categoria}</Text>
                        </View>
                    </View>

                    <View style={styles.box_ponto} >
                        <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('PacoteCliente')}>
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