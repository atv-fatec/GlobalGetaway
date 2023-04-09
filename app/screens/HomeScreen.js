import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
	const navigate = useNavigation();

	return (
		<View>
			<Text>Bem-vindo, Administrador!</Text>

			<Text>Selecione uma das opções abaixo:</Text>

			<View>
				<TouchableOpacity style={styles.button} onPress={() => navigate.navigate('Hotel')}>
					<Text style={styles.buttonText}>Hotéis</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigate.navigate('Ponto')}>
					<Text style={styles.buttonText}>Pontos Turísticos</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigate.navigate('Pacote')}>
					<Text style={styles.buttonText}>Pacotes</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({

})