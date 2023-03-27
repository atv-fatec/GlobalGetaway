import React, { useState } from "react";
import {Link} from "expo-router";
import { Body, 
  ButtonLogin, 
  ButtonLoginText, 
  ButtonPassword, 
  ButtonText, 
  Container, 
  Input, 
  LoginText,  
} from "./styles/signup"

export default function Signup() {
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
            <ButtonLoginText><Link href="/">Cadastrar!</Link></ButtonLoginText>
        </ButtonLogin>

    </Container>
</Body>
  );
}

