import React, {useEffect, useState,useCallback} from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const HomeClienteScreen = () => {
  const navigate = useNavigation();

  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigate.navigate('PontoCliente')}>
      <View style={styles.box_ponto} >
        <Image style={styles.image}></Image>
        <Text style={styles.title_ponto}>{item.title}</Text>
        <Text style={styles.txt_ponto}></Text>
      </View>
    </TouchableOpacity>
  )

  const categorias = [
    {
      nomeCat: 'Categoria 1',
    },
    {
      nomeCat: 'Categoria 2',
    },
    {
      nomeCat: 'Categoria 3',
    },
    {
      nomeCat: 'Categoria 4',
    },
  ];

  const renderCategoria = ({item}) => (
    <TouchableOpacity>
      <View style={styles.icone_categoria}>
        <Text>{item.nomeCat}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView>
        <View style={styles.screenContainer}>
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          
          <View style={styles.box_categorias}>
            <Text style={styles.title_categoria}>Categorias</Text>
            <View style={styles.box_categoria}>
              <FlatList
                data={categorias}
                renderItem={renderCategoria}
                keyExtractor={cat => cat.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          
          <View style={styles.box_pacotes}>
            <Text style={styles.title_categoria}>Pacotes</Text>
            <TouchableOpacity onPress={() => navigate.navigate('PacoteCliente')}>
              <View style={styles.box_pacote}>
                <View style={styles.row_pacote}>
                  <View style={styles.col_imgpacote}>
                    <Image style={styles.imagePacote}></Image>
                  </View>
                  <View style={styles.col_txtpacote}>
                    <Text style={styles.title_pacote}>Nome do Pacote</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate.navigate('PacoteCliente')}>
              <View style={styles.box_pacote}>
                <View style={styles.row_pacote}>
                  <View style={styles.col_imgpacote}>
                    <Image style={styles.imagePacote}></Image>
                  </View>
                  <View style={styles.col_txtpacote}>
                    <Text style={styles.title_pacote}>Nome do Pacote</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate.navigate('PacoteCliente')}>
              <View style={styles.box_pacote}>
                <View style={styles.row_pacote}>
                  <View style={styles.col_imgpacote}>
                    <Image style={styles.imagePacote}></Image>
                  </View>
                  <View style={styles.col_txtpacote}>
                    <Text style={styles.title_pacote}>Nome do Pacote</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  box_ponto: {
    width: 137,
    height: 175,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
    margin: 10,
    marginLeft: 0,
    shadowColor: '#21768B',
    shadowOffset: {
      width: 10,
      height: 4,
    },
    shadowOpacity: '100%',
    shadowRadius: 20,
    elevation: 7,
  },
  container: {
    paddingLeft: 10,
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: "#87DEB1",
    borderRadius: 10,
  },
  imagePacote: {
    width: 60,
    height: 60,
    backgroundColor: '#AAFA9B',
    borderRadius: 10,
  },
  title_ponto:{
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6
  },
  title_pacote:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  txt_ponto:{
    color: "#939393",
    marginTop: 4
  },
  txt_pacote:{
    color: "#939393",
    width: '60%',
  },
  box_categorias: {
    marginTop: 5,
    paddingLeft: 8,
    paddingTop: 5,
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
    backgroundColor: "#61C3C6",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginLeft: 0
  },
  box_pacotes: {
    margin: 5,
    padding: 8,
  },
  box_pacote:{
    width: '100%',
    backgroundColor: '#FFFF',
    height: 80,
    borderRadius: 10,
    marginRight: 5,
    marginTop: 10,
    padding: 5,
    flex: 1,
    shadowColor: '#21768B',
    shadowOffset: {
      width: 10,
      height: 4,
    },
    shadowOpacity: '100%',
    shadowRadius: 20,
    elevation: 7,
  },
  row_pacote:{
    flexDirection: 'row',
  },
  col_imgpacote:{
    width: 60,
    height: 60,
    margin: 5,
  },
  col_txtpacote:{
    width: 200,
    height: 60,
    margin: 5,
  },
  screenContainer:{
    backgroundColor: '#F6F7FB',
  }
});


export default HomeClienteScreen;