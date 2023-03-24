import styled from "styled-components/native";

export const Body = styled.View`
    background: #F6F7FB;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Pic = styled.View`
    width: 40px;
    height: 40px;
    background: #16D5D5;
    border-radius: 10px;
    margin: 20px;
`;

export const Container = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Header = styled.Text`
    font-size: 30px;
    color: #0D404B;
    margin: 30px;
`;

export const Input = styled.TextInput`
    width: 80%;
    border: 2px solid #0D829B;
    border-radius: 20px;
    padding-left: 15px;
    color: #FCF5EF;
    margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
    background: #37BBCA;
    width: 40%;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const ButtonText = styled.Text`
    color: #FCF5EF;
`;