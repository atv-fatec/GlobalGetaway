import React from 'react';
import AppRoutes from './app/routes';
import './app/configs/index'
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
    return (
        <AppRoutes />
    );
};

export default App;