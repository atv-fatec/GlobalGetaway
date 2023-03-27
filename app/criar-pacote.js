import React from 'react'

import {
    Body,
    Button,
    ButtonText,
    Container,
    Header,
    Input,
    Pic
} from './styles/criar-ponto'

export default function CriarPacote() {
    return (
        <Body>
            <Pic />

            <Header>Pacote</Header>

            <Container>
                <Input
                    placeholder="Nome"
                    placeholderTextColor="#0D404B"
                    keyboardType="default"
                />

                <Input
                    placeholder="Preço inicial"
                    placeholderTextColor="#0D404B"
                    keyboardType="default"
                />

                <Input
                    placeholder="Categoria"
                    placeholderTextColor="#0D404B"
                    keyboardType="default"
                />

                <Input
                    placeholder="Descrição"
                    placeholderTextColor="#0D404B"
                    keyboardType="default"
                    height={100}
                />

                <Button>
                    <ButtonText>Criar!</ButtonText>
                </Button>
            </Container>
        </Body>
    );
};