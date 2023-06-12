import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MenuScreen from '../components/Menu';

const HomeScreen = () => {
    const navigate = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bem-vindo, Administrador!</Text>

            <Text style={styles.subtitulo}>Selecione uma das opções abaixo:</Text>
            <MenuScreen />

            <View>
                <TouchableOpacity style={styles.button1} onPress={() => navigate.navigate('Ponto')}>
                    <Text style={styles.buttonText}>Pontos Turísticos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2} onPress={() => navigate.navigate('Hotel')}>
                    <Text style={styles.buttonText}>Hotéis</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button3} onPress={() => navigate.navigate('Pacote')}>
                    <Text style={styles.buttonText}>Pacotes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button4} onPress={() => navigate.navigate('Usuario')}>
                    <Text style={styles.buttonText}>Usuários</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulo: {
        fontSize: 25,
        fontWeight: 500,
        color: '#145B79',
        margin: 10,
    },
    
    subtitulo: {
        fontSize: 20,
        fontWeight: 400,
        margin: 10,
        color: '#2E6774'
    },

    button1: {
        backgroundColor: '#87DEB1',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },

    button2: {
        backgroundColor: '#61C3C6',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },

    button3: {
        backgroundColor: '#46ADD6',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },

    button4: {
        backgroundColor: '#0191B6',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
})