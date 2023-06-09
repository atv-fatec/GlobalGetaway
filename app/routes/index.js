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
import PacoteClienteScreen from '../screens/PacoteClienteScreen';
import PontoClienteScreen from '../screens/PontoClienteScreen';
import UsuariosScreen from '../screens/Usuarios';
import CarrinhoScreen from '../screens/CarrinhoScreen';

const Stack = createStackNavigator();

const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Pacote">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>

                <Stack.Screen name="SignUp" component={SignUpScreen} />

                <Stack.Screen name="Home" component={BottomNavbar} options={{ headerTitle: 'Administrador' }} />

                <Stack.Screen name="Principal" component={BottomNavbarCli} options={{ headerShown: false }} />
                
                <Stack.Screen name="CriarPonto" component={CriarPontoScreen} options={{ headerTitle: 'Cadastrar/Editar Ponto Turístico' }} />

                <Stack.Screen name="CriarHotel" component={CriarHoteisScreen} options={{ headerTitle: 'Cadastrar/Editar Hotel' }} />

                <Stack.Screen name="CriarPacote" component={CriarPacotesScreen} options={{ headerTitle: 'Cadastrar/Editar Pacote' }} />

                <Stack.Screen name="Hotel" component={HoteisScreen} options={{ headerTitle: 'Hotéis' }} />

                <Stack.Screen name="Ponto" component={PontosScreen} options={{ headerTitle: 'Pontos Turísticos' }} />

                <Stack.Screen name="Pacote" component={PacotesScreen} options={{ headerTitle: 'Pacotes' }} />

                <Stack.Screen name="Usuario" component={UsuariosScreen} options={{ headerTitle: 'Usuários' }} />

                <Stack.Screen name="PacoteCliente" component={PacoteClienteScreen} options={{ headerTitle: 'Pacotes' }} />

                <Stack.Screen name="PontoCliente" component={PontoClienteScreen} options={{ headerTitle: 'Ponto' }} />

                <Stack.Screen name="Carrinho" component={CarrinhoScreen} options={{ headerTitle: 'Carrinho' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;