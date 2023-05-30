import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import PontosScreen from '../screens/PontosScreen';
import HoteisScreen from '../screens/HoteisScreen';
import PacotesScreen from '../screens/PacotesScreen';

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pontos Turísticos"
        component={PontosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="location-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Hotéis"
        component={HoteisScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bed-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pacotes"
        component={PacotesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavbar;
