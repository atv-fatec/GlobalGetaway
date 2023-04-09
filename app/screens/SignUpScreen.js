import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigation();

    const auth = getAuth();

    async function handleSignUp() {
        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigate.navigate("Login");
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
                    onChangeText={(text) =>  setValue({ ...value, password: text })}
                />
            </View>

            {/*<View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Confirmar senha"
                    secureTextEntry
                    value={value.password}
                    onChangeText={(text) =>  setValue({ ...value, password: text }) }
                />
            </View>*/}

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
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SignUpScreen;