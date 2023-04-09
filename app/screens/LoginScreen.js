import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from '../configs/index';

import HomeScreen from './HomeScreen';

const LoginScreen = () => {
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigation();
    const authFirebase = getAuth();

    async function handleLogin() {
        if (value.email === "" || value.password === "") {
            setErrorMessage("Os campos email e senha são obrigatórios");
            return;
        }
        try {
            await signInWithEmailAndPassword(
                authFirebase,
                value.email,
                value.password
            );

            navigate.navigate("Home");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Senha"
                    secureTextEntry
                    value={value.password}
                    onChangeText={(text) =>  setValue({ ...value, password: text }) }
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('SignUp')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('Principal')}>
                <Text style={styles.buttonText}>Cliente</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
    },
    
    input: {
        padding: 10,
        fontSize: 16,
    },

    passwordInput: {
        marginTop: 0,
    },

    button: {
        width: '80%',
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default LoginScreen;