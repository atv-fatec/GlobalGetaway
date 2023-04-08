import styled from "styled-components/native";

export const Header = styled.Text`
    font-size: 30px;
    color: #0D404B;
    margin-left: 20px;
    top: 60px;
`;

export const Body = styled.View`
    background: #F6F7FB;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.TextInput`
    width: 90%;
    border: 2px solid #0D829B;
    border-radius: 20px;
    padding-left: 15px;
    color: #FCF5EF;
    margin-bottom: 20px;
    top: 80px;
    left: 20px;
`;

export const Box = styled.View`
    background: #F6F7FB;
    display: flex;
    flex-direction: column;
`;

export const Button = styled.TouchableOpacity`
    background: #37BBCA;
    width: 20%;
    border-radius: 10px;
    padding: 8px;
    align-items: center;
    justify-content: center;
    top: 28px;
    left: 260px;
`;

export const ButtonText = styled.Text`
    color: #FCF5EF;
`;