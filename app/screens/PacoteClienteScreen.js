import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const PacoteClienteScreen = () => {
    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    return (
        <>
            <ScrollView>
                <Image style={styles.image}></Image>
                <View style={styles.box_ponto}>
                    <Text style={styles.title_ponto}>Pontos incluidos</Text>
                    <Text style={styles.list}>
                        {data.map((item, index) => (
                        <Text key={index}>
                            {index > 0 ? '\n' : ''}
                            &bull; {item}
                        </Text>
                        ))}
                    </Text>
                </View>

                <View style={styles.box_ponto}>
                    <Text style={styles.title_ponto}>Data</Text>
                    <Text>
                        26/05/2023 - 28/05/2023
                    </Text>
                </View>

                <View style={styles.box_ponto}>
                    <Text style={styles.title_ponto}>Hotel</Text>
                    <Text>
                        Hotel Blablabla
                    </Text>
                </View>

                <View style={styles.box_pacote}>
                    <View style={styles.row_pacote}>
                        <View style={styles.col_precopacote}>
                            <Text>Total:</Text>
                            <Text>R$ 123,00</Text>
                        </View>
                        <View style={styles.col_botaopacote}>
                            <TouchableOpacity style={styles.button} onPress={() => navigate.navigate()}>
                                <Text style={styles.buttonText}>Adquira agora!</Text>
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
    title_ponto:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6
    },
    txt_ponto:{
        color: "#939393",
        marginTop: 4
    },
    box_ponto:{
        margin: 10
    },
    icone_categoria:{
        width: 100,
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

    box_pacote:{
        flex: 1,
        margin: 10
    },

    row_pacote:{
        flexDirection: 'row',
    },

    col_precopacote:{
        width: '30%',
        margin: 5,
    },

    col_botaopacote:{
        width: '70%',
        margin: 5,
    },

    button: {
        backgroundColor: '#0D829B',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
		padding: 10,
        width: '70%'
    },
})

export default PacoteClienteScreen;