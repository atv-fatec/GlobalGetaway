import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BottomNavbar from '../components/BottomNavbar';
import CriarPontoScreen from '../screens/CriarPontoScreen';
import CriarHoteisScreen from '../screens/CriarHoteisScreen';
import CriarPacotesScreen from '../screens/CriarPacotesScreen';
import BottomNavbarCli from '../components/BottomNavbarCli';
import HoteisScreen from '../screens/HoteisScreen';
import PontosScreen from '../screens/PontosScreen';
import PacotesScreen from '../screens/PacotesScreen';

const Stack = createStackNavigator();

const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CriarPacote">
                <Stack.Screen name="Login" component={LoginScreen} />

                <Stack.Screen name="SignUp" component={SignUpScreen} />

                <Stack.Screen name="Home" component={BottomNavbar} options={{ headerTitle: 'Administrador' }} />

                <Stack.Screen name="Principal" component={BottomNavbarCli} options={{ headerTitle: 'Cliente' }} />
                <Stack.Screen name="CriarPonto" component={CriarPontoScreen} options={{ headerTitle: 'Cadastrar Ponto Turístico' }} />

                <Stack.Screen name="CriarHotel" component={CriarHoteisScreen} options={{ headerTitle: 'Cadastrar Hotel' }} />

                <Stack.Screen name="CriarPacote" component={CriarPacotesScreen} options={{ headerTitle: 'Cadastrar Pacote' }} />

                <Stack.Screen name="Hotel" component={HoteisScreen} options={{ headerTitle: 'Hotéis' }} />

                <Stack.Screen name="Ponto" component={PontosScreen} options={{ headerTitle: 'Pontos Turísticos' }} />

                <Stack.Screen name="Pacote" component={PacotesScreen} options={{ headerTitle: 'Pacotes' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;