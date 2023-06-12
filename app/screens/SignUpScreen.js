import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { db } from '../configs';
import { doc, setDoc } from '@firebase/firestore';
import { Alert } from 'react-native';

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
                    Alert.alert("Conta criada!",  "Conta criada com sucesso." , [{text: "OK!", style: "cancel"}])

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
            <Text style={styles.label}>Nome</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu nome"
                    value={value.nome}
                    onChangeText={(text) => setValue({ ...value, nome: text })}
                />
            </View>

            <Text style={styles.label}>E-mail</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu e-mail"
                    value={value.email}
                    keyboardType="email-address"
                    onChangeText={(text) => setValue({ ...value, email: text })}
                />
            </View>

            <Text style={styles.label}>CPF</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu CPF"
                    value={value.cpf}
                    keyboardType="numeric"
                    onChangeText={(text) => setValue({ ...value, cpf: text })}
                />
            </View>

            <Text style={styles.label}>Senha</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Insira sua senha"
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

    label: {
        marginStart: 40,
        alignSelf: 'flex-start',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 5,
        color: '#0D404B',
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