import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { emailValidator } from "../utils/validators";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { Navigation } from "../utils/types";
import { sendEmailWithPassword } from "../api";
import Toast from "../components/Toast";

type Props = {
  navigation: Navigation;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {

  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });

  const _onSendPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    setLoading(true);

    const response = await sendEmailWithPassword(email.value);

    if (response.error) {
      setToast({ type: "error", value: response.error });
    } else {
      setToast({
        type: "success",
        value: "Um e-mail para alterar sua senha foi enviado."
      });
    }
    setLoading(false);
  };

  return (
    <Background>
      <Header backButton={'LoginScreen'} nav={navigation}>Recuperar senha</Header>
      <Logo />
      <TextInput
        label="E-mail de cadastro"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Button
        loading={loading}
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}
      >
        Enviar informações
      </Button>
      <Toast
        type={toast.type}
        message={toast.value}
        onDismiss={() => setToast({ value: "", type: "" })}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 12
  }
});

export default ForgotPasswordScreen;
