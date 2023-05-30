import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeClienteScreen from '../screens/HomeClienteScreen';
import InformacoesScreen from '../screens/InformacoesScreen';

const Tab = createBottomTabNavigator();

const BottomNavbarCli = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Principal"
        component={HomeClienteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Informações do Usuário"
        component={InformacoesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbarCli;
