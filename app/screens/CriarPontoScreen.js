import { View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import DropdownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { uuidv4 } from '@firebase/util';
import React, { useState } from 'react';
import { db, storage } from '../configs/index';

const CriarPontoScreen = ({ route }) => {
    const navigation = useNavigation()

    const [ponto, setPonto] = useState({
        nome: '',
        descricao: '',
        estado: '',
        cidade: '',
    });

    const [images, setImages] = useState([])

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(route?.params?.categoria || []);

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
        await addDoc(collection(db, "pontos"), {
            nome: ponto.nome,
            descricao: ponto.descricao,
            categoria: value,
            estado: ponto.estado,
            cidade: ponto.cidade,
            imgs: renderUploadImages?.map((i) => ({
                id: i.id,
                url: i.url
            }))
        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
        });
    }

    const editarDados = async () => {
        const renderUploadImages = await uploadImage(images)

        const refDB = doc(db, `pontos/${route?.params?.id}`)

        if (ponto.nome.length === 0) {
            setPonto((prevState) => ({ ...prevState, nome: route?.params?.nome }));
        }

        if (ponto.descricao.length === 0) {
            setPonto((prevState) => ({ ...prevState, descricao: route?.params?.descricao }));
        }

        if (ponto.estado.length === 0) {
            setPonto((prevState) => ({ ...prevState, estado: route?.params?.estado }));
        }

        if (ponto.cidade.length === 0) {
            setPonto((prevState) => ({ ...prevState, cidade: route?.params?.cidade }));
        }

        if (value === []) {
            setValue(route?.params?.categoria)
        }

        await updateDoc(refDB, {
            nome: ponto.nome || route?.params?.nome,
            descricao: ponto.descricao || route?.params?.descricao,
            categoria: value || route?.params?.categoria,
            estado: ponto.estado || route?.params?.estado,
            cidade: ponto.cidade || route?.params?.cidade,
            imgs: images.length > 0 ? renderUploadImages?.map((i) => ({
                id: i.id,
                url: i.url
            })) : route?.params?.images
        }).then(() => {
            navigation.navigate('Home')
        }).catch((err) => {
            console.log(err)
        });
    }

    const categorias = [
        {
            nomeCat: 'Lazer',
        },
        {
            nomeCat: 'Cultura',
        },
        {
            nomeCat: 'Gastronomia',
        },
        {
            nomeCat: 'Arquitetura',
        },
        {
            nomeCat: 'Religião',
        },
        {
            nomeCat: 'Compras',
        },
    ];

    return (
        <ScrollView>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    defaultValue={route?.params?.nome}
                    onChangeText={(text) => setPonto({ ...ponto, nome: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    defaultValue={route?.params?.descricao}
                    onChangeText={(text) => setPonto({ ...ponto, descricao: text })}
                />

                <View style={{ zIndex: 900 }}>
                    <DropdownPicker
                        style={styles.input}
                        schema={{ label: 'label', value: 'value' }}
                        multiple={true}
                        min={1}
                        max={50}
                        open={open}
                        value={value}
                        items={categorias?.map(item => ({ label: item?.nomeCat, value: item?.nomeCat })) || []}
                        setOpen={setOpen}
                        setValue={setValue}
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Estado"
                    defaultValue={route?.params?.estado}
                    onChangeText={(text) => setPonto({ ...ponto, estado: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    defaultValue={route?.params?.cidade}
                    onChangeText={(text) => setPonto({ ...ponto, cidade: text })}
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
        </ScrollView>
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
        borderColor: '#87DEB1',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },

    botao: {
        borderWidth: 2.5,
        borderColor: '#87DEB1',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: 35,
        width: '60%',
        borderRadius: 5,
        marginBottom: 10
    }
});

export default CriarPontoScreen;