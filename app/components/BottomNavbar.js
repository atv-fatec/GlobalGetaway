import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PontosScreen from '../screens/PontosScreen';
import HoteisScreen from '../screens/HoteisScreen';
import PacotesScreen from '../screens/PacotesScreen';

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pontos Turísticos" component={PontosScreen} />
      <Tab.Screen name="Hotéis" component={HoteisScreen} />
      <Tab.Screen name="Pacotes" component={PacotesScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavbar;