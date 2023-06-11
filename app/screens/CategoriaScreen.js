import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../configs'; 
import { useNavigation, useRoute } from "@react-navigation/native";

const CategoriaScreen = () => {
    const navigate = useNavigation();
    const route = useRoute();
    const [pacotes, setPacotes] = useState([]);
  
    const loadPacotes = useCallback(async () => {
        const categoria = route.params.categoria;
        console.log(route.params.categoria);
      
        const pacotesRef = collection(db, "pacotes");
        const querySnapshot = await getDocs(pacotesRef);
      
        const objetosFiltrados = querySnapshot.docs.flatMap((doc) => {
          const pacote = doc.data();
          const categorias = pacote.categorias;
      
          if (categorias.includes(categoria)) {
            return {
                pacote
            };
          } else {
            return null;
          }
        });
      
        const pacotesFiltrados = objetosFiltrados.filter((pacote) => pacote !== null);
        setPacotes(pacotesFiltrados);
      }, [route.params.categoria]);
  
    useEffect(() => {
      loadPacotes();
    }, [loadPacotes]);
  
    const renderPacote = ({ item }) => (
      <TouchableOpacity onPress={() => navigate.navigate('PacoteCliente', { body: item.pacote })}>
        <View style={styles.box_pacote}>
          <Text style={styles.title_pacote}>{item.pacote.nome}</Text>
          <Text style={styles.txt_pacote}>Valor: R$ {item.pacote.valor}</Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Pacotes da categoria {route.params.categoria}:</Text>
        {pacotes.length > 0 ? (
          <FlatList
            data={pacotes}
            renderItem={renderPacote}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>Nenhum pacote encontrado.</Text>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: '#F6F7FB',
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    box_pacote: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      shadowColor: '#21768B',
      shadowOffset: {
        width: 10,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 7,
    },
    title_pacote: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    txt_pacote: {
      color: '#939393',
      marginTop: 4,
    },
  });

export default CategoriaScreen;