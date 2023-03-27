import styled from "styled-components/native";
import { StyleSheet } from 'react-native';

export const Body = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Container = styled.View`
    width: 80%;
    height: 80%;  
    align-items: center;
    justify-content: center;
    background: #34D4E6;
    backdrop-filter: blur(20px);
    border-radius: 20px;
`;

export const LogoText = styled.Text`
    margin-bottom: 25px;
    font-size: 30px;
    color: #FCF5EF;
`;

export const LoginText = styled.Text`
    margin-bottom: 20px;
    font-size: 26px;
    color: #FCF5EF;
`;

export const LinkText = styled.Text`
    margin-bottom: 20px;
    font-size: 18px;
    color: #FCF5EF;
`;

export const SignupText = styled.Text`
    margin-top: 20px;
    font-size: 18px;
    color: #0080A1;
`;

export const Input = styled.TextInput`
    width: 80%;
    border: 2px solid #FCF5EF;
    border-radius: 20px;
    padding-left: 15px;
    color: #FCF5EF;
    margin-bottom: 20px;
`;

export const ButtonPassword = styled.TouchableOpacity`
    background: #37BBCA;
    width: 40%;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    margin-right: 30px;
`;

export const ButtonText = styled.Text`
    color: #FCF5EF;
`;

export const ButtonLogin = styled.TouchableOpacity`
    background: #FCF5EF;
    width: 40%;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const ButtonLoginText = styled.Text`
    color: #0080A1;
`;