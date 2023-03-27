import React, { useState } from "react";
import {Link} from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { NativeBaseProvider } from 'native-base';
import { Body, 
  ButtonLogin, 
  ButtonLoginText, 
  ButtonPassword, 
  ButtonText, 
  Container, 
  Input, 
  LoginText, 
  LogoText,
  SignupText,
  LinkText
} from "./styles/login"



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};
const LinearGradient = require('expo-linear-gradient').LinearGradient;
  return <NativeBaseProvider config={config}>
      
        <Body
        bg={{
            linearGradient: {
              colors: ['lightBlue.300', 'violet.800'],
              start: [0, 0],
              end: [1, 0]
            }
          }}
        >
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
                        <ButtonLoginText><Link href="/home">Log In!</Link ></ButtonLoginText>
                    </ButtonLogin>
                    <SignupText>Não possui uma conta?</SignupText>
                    <LinkText>
                        <Link href="/signup">Sign up!</Link>
                    </LinkText>
                </Container>
        </Body>
  </NativeBaseProvider>
}