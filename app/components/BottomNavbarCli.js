import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeClienteScreen from '../screens/HomeClienteScreen';
import InformacoesScreen from '../screens/InformacoesScreen';


const Tab = createBottomTabNavigator();

const BottomNavbarCli = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Principal" component={HomeClienteScreen} />
      <Tab.Screen name="Informações do Usuário" component={InformacoesScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavbarCli;