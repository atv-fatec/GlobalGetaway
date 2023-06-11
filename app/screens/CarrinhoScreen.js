import { arrayUnion, collection, doc, getDoc, updateDoc } from "@firebase/firestore";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useAuthentication } from "../hooks";
import React, { useState } from "react";
import { db } from "../configs";

const CarrinhoScreen = () => {
    const { user } = useAuthentication()

    const navigation = useNavigation();

    const router = useRoute()

    const [open, setOpen] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [formaPagamento, setFormaPagamento] = useState(formaPagamentoOptions);
    const [quantidadeParcelas, setQuantidadeParcelas] = useState(quantidadeParcelasOptions);
    const [tipoChavePix, setTipoChavePix] = useState(chavePixOptions);
    const [numCartao, setNumCartao] = useState({
        numero: ''
    })
    const [chavePix, setChavePix] = useState({
        chave: ''
    })

    const chavePixOptions = [
        { label: 'CPF', value: 'cpf' },
        { label: 'Email', value: 'email' },
        { label: 'Aleatória', value: 'aleatoria' },
        { label: 'Telefone', value: 'telefone' },
    ]

    const formaPagamentoOptions = [
        { label: 'Cartão de Crédito', value: 'credito' },
        { label: 'Cartão de Débito', value: 'debito' },
        { label: 'Boleto Bancário', value: 'boleto' },
        { label: 'PIX', value: 'pix' },
    ];

    const quantidadeParcelasOptions = [
        { label: '1x', value: '1' },
        { label: '2x', value: '2' },
        { label: '3x', value: '3' },
        { label: '4x', value: '4' },
        { label: '5x', value: '5' },
    ];


    const handleSubmitBuy = async () => {
        const collect = doc(collection(db, "usuarios"), String(user?.uid));
        await updateDoc(collect, {
            compra: arrayUnion({
                nome: router.params.nome,
                inicio: router.params.inicio,
                metodo: formaPagamento,
                parcelas: quantidadeParcelas || null,
                tipoChave: tipoChavePix || null,
                chavePix: chavePix.chave || null,
                numeroCartao: numCartao.numero || null,
                valor: router.params.valor,
                hotel: {
                    nome: router.params.hotel.nome,
                    cidade: router.params.hotel.cidade,
                    estado: router.params.hotel.estado
                },
                ponto: router.params.ponto.map(i => (i.nome)),
                final: router.params.final
            })
        }).then(() => {
            navigation.navigate('Principal')
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>Forma de Pagamento</Text>

                <View style={{ zIndex: 900 }}>
                    <DropdownPicker
                        placeholder="Selecione a forma de pagamento"
                        schema={{ label: 'label', value: 'value' }}
                        style={styles.input}
                        multiple={false}
                        min={1}
                        max={50}
                        value={formaPagamento}
                        setValue={setFormaPagamento}
                        open={open}
                        zIndex={100}
                        items={formaPagamentoOptions?.map(item => ({ label: item?.label, value: item?.value })) || []}
                        setOpen={setOpen}
                    />
                </View>

                {formaPagamento === 'debito' ?
                    <>
                        <Text style={styles.label}>Número do cartão</Text>

                        <TextInput
                            style={styles.inputtext}
                            placeholder="Insira o número do cartão"
                            onChangeText={(text) => setNumCartao({ ...numCartao, numero: text })}
                            keyboardType="numeric"
                        />
                    </>
                    : null
                }

                {formaPagamento === 'credito' ?
                    <>
                        <Text style={styles.label}>Parcelas</Text>

                        <View style={{ zIndex: 800 }}>
                            <DropdownPicker
                                placeholder="Selecione a quantidade de parcelas"
                                schema={{ label: 'label', value: 'value' }}
                                style={styles.input}
                                multiple={false}
                                min={1}
                                max={50}
                                open={openP}
                                setValue={setQuantidadeParcelas}
                                value={quantidadeParcelas}
                                zIndex={100}
                                items={quantidadeParcelasOptions?.map(item => ({ label: item?.label, value: item?.value })) || []}
                                setOpen={setOpenP}
                            />
                        </View>
                        <Text style={styles.label}>Número do cartão</Text>

                        <TextInput
                            style={styles.inputtext}
                            placeholder="Insira o número do cartão"
                            onChangeText={(text) => setNumCartao({ ...numCartao, numero: text })}
                            keyboardType="numeric"
                        />
                    </>
                    : null
                }

                {formaPagamento === 'pix' ?
                    <>
                        <Text style={styles.label}>Chave PIX</Text>

                        <View style={{ zIndex: 800 }}>
                            <DropdownPicker
                                placeholder="Selecione o tipo da chave pix"
                                schema={{ label: 'label', value: 'value' }}
                                style={styles.input}
                                multiple={false}
                                min={1}
                                max={50}
                                open={openP}
                                setValue={setTipoChavePix}
                                value={tipoChavePix}
                                zIndex={100}
                                items={chavePixOptions?.map(item => ({ label: item?.label, value: item?.value })) || []}
                                setOpen={setOpenP}
                            />
                        </View>
                        <TextInput
                            style={styles.inputtext}
                            placeholder="Insira a chave PIX"
                            onChangeText={(text) => setChavePix({ ...chavePix, chave: text })}
                        />
                    </>
                    : null
                }

                <Button onPress={handleSubmitBuy} title="Finalizar compra!" style={styles.button} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    input: {
        borderWidth: 2,
        borderColor: "#46ADD6",
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: "100%",
    },

    inputtext:{
        borderWidth: 2,
        borderColor: "#46ADD6",
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        width: 320,
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
});

export default CarrinhoScreen;
