import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InformacoesScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.info}>Informações pessoais</Text>
                <Text>Nome: Maria Clara</Text>
                <Text>Email: mariaclara@email.com</Text>
                <Text>CPF: 1234567890</Text>
                <Text>Senha: 12345</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.info}>Viagens marcadas</Text>
                <Text>Nome do pacote</Text>
                <Text>Data</Text>
                <Text>Hotel</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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
    },

    info: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 24,
        color: '#0D404B',
    }
});

export default InformacoesScreen;