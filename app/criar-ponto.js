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

export default function CriarPonto() {
    return (
        <Body>
            <Pic />

            <Header>Ponto Turístico</Header>

            <Container>
                <Input
                    placeholder="Nome"
                    placeholderTextColor="#0D404B"
                    keyboardType="default"
                />

                <Input
                    placeholder="Local"
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