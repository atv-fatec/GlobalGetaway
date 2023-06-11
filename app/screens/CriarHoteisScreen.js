import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import { uuidv4 } from '@firebase/util';
import React, { useState } from 'react';
import { db, storage } from '../configs/index';
import { AntDesign } from '@expo/vector-icons';

const CriarHoteisScreen = ({ route }) => {
    const navigation = useNavigation();

    const [hotel, setHotel] = useState({
        nome: '',
        estado: '',
        cidade: '',
        rating: 0
    });

    const [images, setImages] = useState([])

    const pickImage = async () => {
        let result = await launchImageLibraryAsync({
            mediaType: MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
            aspect: [16, 8],
        })

        if (!result.canceled) {
            setImages(result.assets)
        }
    }

    const uploadImage = async (images) => {
        const uploadPromise = images.map(async (image) => {
            const id = uuidv4()
            const response = await fetch(image.uri)
            const blob = await response.blob()
            const imageRef = ref(storage, `images/${id}`)
            const uploadStatus = uploadBytesResumable(imageRef, blob)
            const snapshot = await uploadStatus

            return { id, url: await getDownloadURL(snapshot.ref) }
        })

        return Promise.all(uploadPromise)
    }

    const enviarDados = async () => {
        const renderUploadImages = await uploadImage(images)
        await addDoc(collection(db, "hoteis"), {
            nome: hotel.nome,
            estado: hotel.estado,
            cidade: hotel.cidade,
            rating: hotel.rating,
            imgs: renderUploadImages?.map((i) => ({
                id: i.id,
                url: i.url
            }))
        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
        });
    };

    const editarDados = async () => {
        const renderUploadImages = await uploadImage(images)
        const refDB = doc(db, `hoteis/${route?.params?.id}`);

        if (hotel.nome.length === 0) {
            setHotel((prevState) => ({ ...prevState, nome: route?.params?.nome }));
        }

        if (hotel.estado.length === 0) {
            setHotel((prevState) => ({ ...prevState, estado: route?.params?.estado }));
        }

        if (hotel.cidade.length === 0) {
            setHotel((prevState) => ({ ...prevState, cidade: route?.params?.cidade }));
        }

        if (hotel.rating === 0) {
            setHotel((prevState) => ({ ...prevState, rating: route?.params?.rating }));
        }

        updateDoc(refDB, {
            nome: hotel.nome || route?.params?.nome,
            estado: hotel.estado || route?.params?.estado,
            cidade: hotel.cidade || route?.params?.cidade,
            rating: hotel.rating || route?.params?.rating,
            imgs: images.length > 0 ? renderUploadImages?.map((i) => ({
                id: i.id,
                url: i.url
            })) : route?.params?.images
        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                defaultValue={route?.params?.nome}
                onChangeText={(text) => setHotel({ ...hotel, nome: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Estado"
                defaultValue={route?.params?.estado}
                onChangeText={(text) => setHotel({ ...hotel, estado: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Cidade"
                defaultValue={route?.params?.cidade}
                onChangeText={(text) => setHotel({ ...hotel, cidade: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Classificação"
                defaultValue={route?.params?.rating}
                keyboardType="numeric"
                onChangeText={(text) => setHotel({ ...hotel, rating: text })}
            />

            <TouchableOpacity style={styles.botao} onPress={pickImage}>
                <AntDesign name="picture" size={20} color="black" />
                <Text style={{ fontSize: 20 }}>Adicionar Imagens</Text>
            </TouchableOpacity>

            {route?.params?.id
                ?
                <Button title="Editar" onPress={editarDados} style={styles.button} />
                :
                <Button title="Enviar" onPress={enviarDados} style={styles.button} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    input: {
        borderWidth: 2,
        borderColor: '#61C3C6',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },

    botao: {
        borderWidth: 2.5,
        borderColor: '#61C3C6',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: 35,
        width: '60%',
        borderRadius: 5,
        marginBottom: 10
    }
});

export default CriarHoteisScreen;