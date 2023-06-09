import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";

const CarrinhoScreen = () => {
  const [open, setOpen] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState(formaPagamentoOptions);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState('');

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

  return (
    <>
      <View style={styles.container}>
      <View style={{ zIndex: 900 }}>
        <DropdownPicker
          placeholder="Selecione a forma de pagamento"
          schema={{ label: 'label', value: 'value' }}
          style={styles.input}
          multiple={true}
          min={1}
          max={50}
          open={open}
          zIndex={100}
          items={formaPagamentoOptions?.map(item => ({ label: item?.label, value: item?.value })) || []}
          setOpen={setOpen}
        />
      </View>

      <View style={{ zIndex: 800 }}>
        <DropdownPicker
          placeholder="Selecione a quantidade de parcelas"
          schema={{ label: 'label', value: 'value' }}
          style={styles.input}
          multiple={true}
          min={1}
          max={50}
          open={openP}
          zIndex={100}
          items={quantidadeParcelasOptions?.map(item => ({ label: item?.label, value: item?.value })) || []}
          setOpen={setOpenP}
        />
      </View>

      <Button title="Finalizar compra!" style={styles.button} />
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
