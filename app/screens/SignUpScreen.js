import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { db } from '../configs';
import { doc, setDoc } from '@firebase/firestore';

const SignUpScreen = ({ navigation }) => {
    const [value, setValue] = useState({
        nome: "",
        email: "",
        cpf: "",
        password: "",
        nivel: 2
    });

    const navigate = useNavigation();

    const auth = getAuth();

    async function handleSignUp() {
        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password).then(async () => {
                const prevUser = auth.currentUser;
                
                const usersRef = doc(db, "usuarios", String(prevUser?.uid));
                
                await setDoc(usersRef, {
                    id: prevUser?.uid,
                    nome: value.nome,
                    email: value.email,
                    cpf: value.cpf,
                    nivel: 2
                }).then(() => {
                    navigation.navigate('Login')
                }).catch((err) => {
                    console.log(err)
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={value.nome}
                    onChangeText={(text) => setValue({ ...value, nome: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={value.email}
                    keyboardType="email-address"
                    onChangeText={(text) => setValue({ ...value, email: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    value={value.cpf}
                    keyboardType="numeric"
                    onChangeText={(text) => setValue({ ...value, cpf: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Senha"
                    secureTextEntry
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
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
        borderWidth: 2,
        borderColor: '#61C3C6',
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
        backgroundColor: '#46ADD6',
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

export default SignUpScreen;