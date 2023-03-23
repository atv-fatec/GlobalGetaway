import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/app/routes/index";
import Login from "./src/app/pages/login";

export default function App() {
    return (
        <NavigationContainer>
            {/*<Routes />*/}
            <Login />
        </NavigationContainer>
    );
}
