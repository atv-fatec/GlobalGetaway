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

export default function TableHotel() {
  return (
    <Body>
        <Box>
        <Header>Hotéis</Header>
            <Input variant="rounded" placeholder="Pesquisar..." />
        </Box>
        <View style={styles.container}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title >ID</DataTable.Title>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title >Estado</DataTable.Title>
              <DataTable.Title >Cidade</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>1</DataTable.Cell>
              <DataTable.Cell>Atlantis</DataTable.Cell>
              <DataTable.Cell>State</DataTable.Cell>
              <DataTable.Cell>City</DataTable.Cell>
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