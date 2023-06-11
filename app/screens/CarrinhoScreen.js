import { arrayUnion, collection, doc, getDoc, updateDoc } from "@firebase/firestore";
import { View, Text, StyleSheet, Button } from "react-native";
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

                {formaPagamento === 'credito' ?
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
});

export default CarrinhoScreen;
