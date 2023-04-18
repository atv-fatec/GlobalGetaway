import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

const HomeClienteScreen = () => {
  return (
    <>
      <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar"
            />
      </View>
      <View style={styles.container}>
        <View style={styles.box_ponto}>
          <Image style={styles.image}></Image>
          <TouchableOpacity>
            <Text style={styles.title_ponto}>Nome do Ponto</Text>
          </TouchableOpacity>
          <Text style={styles.txt_ponto}>Local</Text>
        </View>
      </View>
      <View style={styles.box_categorias}>
        <Text style={styles.title_categoria}>Categorias</Text>
        <View style={styles.box_categoria}>
            <TouchableOpacity><View style={styles.icone_categoria}><Text>Categoria 1</Text></View></TouchableOpacity>
        </View>
      </View>
      <View style={styles.box_pacotes}>
        <Text style={styles.title_categoria}>Pacotes</Text>
        <View style={styles.box_pacote}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  input: {
    width: '100%',
    height: 40,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#D3DE16',
    borderRadius: 5,
    paddingLeft: 10,
  },
  box_ponto: {
    width: 137,
    height: 175,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
  },
  container: {
    width: '100%',
    paddingLeft: 10,
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  title_ponto:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6
  },
  txt_ponto:{
    color: "#939393",
    marginTop: 4
  },
  box_categorias: {
    marginTop: 20,
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
  },
  title_categoria:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  box_categoria:{
    width: '100%',
    alignContent: 'center'
  },
  icone_categoria:{
    width: 100,
    backgroundColor: "#FD9B12",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  box_pacotes: {
    marginTop: 20,
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
  },
  box_pacote:{
    width: '100%',
    backgroundColor: '#FFFF',
    height: 50,
    borderRadius: 10,
    marginTop: 15,
  }
});


export default HomeClienteScreen;