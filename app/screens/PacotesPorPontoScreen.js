import React, { useEffect, useState, useCallback } from 'react';
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../configs';

const PacotesPorPontoScreen = () => {
    const navigate = useNavigation();
    const route = useRoute();
    const [pacotes, setPacotes] = useState([]);

    const loadPacotes = useCallback(async () => {
      const pontoTuristicoNome = route.params.body.nome;
  
      const pacotesRef = collection(db, "pacotes");
      const queryFilterPontoTuristico = query(pacotesRef);
      const querySnapshot = await getDocs(queryFilterPontoTuristico);
      const objetosFiltrados = querySnapshot.docs.flatMap((doc) => {
        const documentoValor = doc.data();
        const objetos = doc.data().ponto;
        return Object.entries(objetos)
          .filter(([_, objeto]) => objeto.nome === pontoTuristicoNome)
          .map(([indice, objeto]) => ({
            documentoValor
          }));
      });

      setPacotes(objetosFiltrados)

      {/*if (!querySnapshot.empty) {
        const pacotesData = querySnapshot.docs.map((doc) => ({
          body: doc.data(),
        }));
        setPacotes(pacotesData);
      }*/}
    }, [route.params.pontoTuristicoNome]);
    useEffect(() => {
      loadPacotes();
    }, [loadPacotes]);

    
  
    const renderPacote = ({ item }) => (
      <TouchableOpacity onPress={() => navigate.navigate('PacoteCliente', { body:{...item.documentoValor} })}>
          <View style={styles.box_pacote} >
            <Text style={styles.title_pacote}>{item.documentoValor.nome}</Text>
            <Text style={styles.txt_pacote}>Valor: R$ {item.documentoValor.valor}</Text>
          </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Pacotes relacionados ao ponto turístico:</Text>
        {pacotes.length > 0 ? (
          <FlatList
            data={pacotes}
            renderItem={renderPacote}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text>Nenhum pacote encontrado.</Text>
        )}
      </View>
    );
};

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

export default PacotesPorPontoScreen;
