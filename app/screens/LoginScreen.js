import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { db } from '../configs/index';

const LoginScreen = () => {
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigation();
    const authFirebase = getAuth();

    const GetDocUsuario = async (usuarioUid) => {
        const collect = doc(collection(db, "usuarios"), usuarioUid);
        const querySnapshot = await getDoc(collect);
        const userData = querySnapshot.data();

        return userData.nivel
    }

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
            ).then(async () => {
                const prevUser = authFirebase.currentUser;
                const nivelUser = await GetDocUsuario(String(prevUser?.uid)).then((res) => res)

                if (nivelUser === 1) {
                    navigate.navigate("Home");
                }
                else {
                    navigate.navigate("Principal")
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <Text style={styles.label}>E-mail</Text>

            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="Insira seu e-mail"
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
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

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.txt}>Não possui uma conta?</Text>

            <TouchableOpacity onPress={() => navigate.navigate('SignUp')}>
                <Text style={styles.signUpText}>Crie uma aqui!</Text>
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
    title: {
        fontWeight: 500,
        fontSize: 35,
        margin: 20,
        color: '#436776',
    },
    button: {
        width: '80%',
        backgroundColor: '#46ADD6',
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
    },
    signUpText: {
        color: '#61C3C6',
        fontSize: 18,
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 16,
        marginTop: 5,
        color: '#436776',
    }
});

export default LoginScreen;