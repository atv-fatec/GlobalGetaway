import React, { useState } from "react";

// importing styles ✨
import { Body, 
        ButtonLogin, 
        ButtonLoginText, 
        ButtonPassword, 
        ButtonText, 
        Container, 
        Input, 
        LoginText, 
        LogoText 
} from "../styles/login";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Body>
            <Container>
                <LogoText>Global Getaway 🌎</LogoText>

                <LoginText>Login</LoginText>

                <Input
                    placeholder="E-mail"
                    placeholderTextColor="#FCF5EF"
                    keyboardType="email-address"
                />

                <Input
                    placeholder="Senha"
                    placeholderTextColor="#FCF5EF"
                    keyboardType="default"
                    secureTextEntry={!showPassword}
                />

                <ButtonPassword onPress={() => setShowPassword(!showPassword)}>
                    <ButtonText>{showPassword ? "Ocultar senha" : "Mostrar senha"}</ButtonText>
                </ButtonPassword>

                <ButtonLogin>
                    <ButtonLoginText>Log In!</ButtonLoginText>
                </ButtonLogin>

            </Container>
        </Body>
    )
};