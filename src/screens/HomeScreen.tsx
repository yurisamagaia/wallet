import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Navigation } from "../utils/types";

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Header>Bem-vindo à Wallet</Header>
    <Logo />
    <Paragraph>
      Um organizador de carteira onde você pode registrar e rastrear seus investimentos de forma fácil e rápida.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
      Login
    </Button>
    <Paragraph>ou</Paragraph>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate("RegisterScreen")}
    >
      Cadastre-se
    </Button>
  </Background>
);

export default HomeScreen;
