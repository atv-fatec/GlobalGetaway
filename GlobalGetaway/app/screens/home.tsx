import React from 'react'

import {
    Body,
    Container,
    ContainerBody,
    Options,
    Pic,
    Text,
    Welcome
} from '../styles/home'

export default function Home() {
    return (
        <Body>
            <Pic />

            <ContainerBody>
                <Welcome>Bem-vindo, ADMIN!</Welcome>

                <Text>O que deseja fazer?</Text>

                <Container>
                    <Options />
                    <Options />
                    <Options />
                    <Options />
                </Container>
                
            </ContainerBody>
        </Body>
    )
}