import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import PacoteClienteScreen from '../screens/PacoteClienteScreen';
import CriarPacotesScreen from '../screens/CriarPacotesScreen';
import PontoClienteScreen from '../screens/PontoClienteScreen';
import CriarHoteisScreen from '../screens/CriarHoteisScreen';
import BottomNavbarCli from '../components/BottomNavbarCli';
import CriarPontoScreen from '../screens/CriarPontoScreen';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import UsuariosScreen from '../screens/UsuariosScreen';
import BottomNavbar from '../components/BottomNavbar';
import PacotesScreen from '../screens/PacotesScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HoteisScreen from '../screens/HoteisScreen';
import PontosScreen from '../screens/PontosScreen';
import LoginScreen from '../screens/LoginScreen';
import CategoriaScreen from "../screens/CategoriaScreen";
import PacotesPorPontoScreen from "../screens/PacotesPorPontoScreen";

const Stack = createStackNavigator();

const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Principal">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

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

                <Stack.Screen name="Categoria" component={CategoriaScreen} options={{ headerTitle: 'Categoria' }}/>

                <Stack.Screen name="PacotesPorPonto" component={PacotesPorPontoScreen} options={{ headerTitle: 'Pacotes' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;