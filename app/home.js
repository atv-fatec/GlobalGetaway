import React from 'react'
import {Link} from "expo-router";
import {
    Body,
    Container,
    ContainerBody,
    Options,
    Pic,
    Text,
    Welcome
} from "./styles/home"

export default function Home() {
  return (
    <Body>
            <Pic />

            <ContainerBody>
                <Welcome>Bem-vindo, ADMIN!</Welcome>

                <Text>O que deseja fazer?</Text>

                <Container>
                    <Link href="/criar-ponto">
                      <Options />
                    </Link>
                    <Link href="/criar-hotel">
                      <Options />
                    </Link>
                    <Link href="/criar-pacote">
                      <Options />
                    </Link>
                </Container>
                
            </ContainerBody>
        </Body>
  );
}

