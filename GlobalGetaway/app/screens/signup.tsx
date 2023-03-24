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
} from "../styles/signup";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Body>
            <Container>
                <LoginText>Sign Up</LoginText>

                <Input
                    placeholder="E-mail"
                    placeholderTextColor="#37BBCA"
                    keyboardType="email-address"
                />

                <Input
                    placeholder="Senha"
                    placeholderTextColor="#37BBCA"
                    keyboardType="default"
                    secureTextEntry={!showPassword}
                />

                <ButtonPassword onPress={() => setShowPassword(!showPassword)}>
                    <ButtonText>{showPassword ? "Ocultar senha" : "Mostrar senha"}</ButtonText>
                </ButtonPassword>

                <ButtonLogin>
                    <ButtonLoginText>Cadastrar!</ButtonLoginText>
                </ButtonLogin>

            </Container>
        </Body>
    )
};