import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const PacoteClienteScreen = () => {
    return (
        <>
            <Image style={styles.image}></Image>
            <View style={styles.box_ponto}>
                <Text style={styles.title_ponto}>Descrição</Text>
                <Text style={styles.txt_ponto}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel nisl id lorem aliquet feugiat vitae eget ante. Fusce tristique quam nec leo vestibulum, et congue justo euismod. In nec lobortis elit.</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '50%',
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
    }
})

export default PacoteClienteScreen;