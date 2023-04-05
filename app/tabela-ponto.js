import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import {Link} from "expo-router";

import {
    Body,
    Input,
    Box,
    Button,
    ButtonText,
    Header
} from './styles/ponto'

export default function TablePonto() {
  return (
    <Body>
        <Box>
        <Header>Pontos turísticos</Header>
            <Input variant="rounded" placeholder="Pesquisar..." />
        </Box>
        <View style={styles.container}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title >ID</DataTable.Title>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title >Categoria</DataTable.Title>
              <DataTable.Title >Estado</DataTable.Title>
              <DataTable.Title >Cidade</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>1</DataTable.Cell>
              <DataTable.Cell>Ponto turístico</DataTable.Cell>
              <DataTable.Cell>Família</DataTable.Cell>
              <DataTable.Cell>SP</DataTable.Cell>
              <DataTable.Cell>São Paulo</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
    </Body>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 10,
  },
});