import styled from "styled-components/native";

export const Body = styled.View`
    display: flex;
    flex-direction: column;
    background-color: #F6F7FB;
    height: 100%;
    width: 100%;
    
`;

export const Welcome = styled.Text`
    color: #0D404B;
    font-size: 30px;
`;

export const Text = styled.Text`
    color: #0D404B;
    font-size: 24px;
    margin-bottom: 40px;
`;

export const Container = styled.View`
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const ContainerBody = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Options = styled.View`
    width: 50px;
    height: 50px;
    background: #D9D9D9;
    border-radius: 10px;
`;

export const Pic = styled.View`
    width: 40px;
    height: 40px;
    background: #16D5D5;
    border-radius: 10px;
    margin: 20px;
    margin-bottom: 60%;
`;