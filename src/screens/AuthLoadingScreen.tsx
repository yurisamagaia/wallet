import React, { memo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import Background from "../components/Background";
import { Navigation } from "../utils/types";
import { theme } from "../utils/theme";
import { FIREBASE_CONFIG } from "../utils/config";

firebase.initializeApp(FIREBASE_CONFIG);

type Props = {
  navigation: Navigation;
};

const AuthLoadingScreen = ({ navigation }: Props) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("HomeScreen");
    }
  });

  return (
    <Background>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center"
  }
})

export default memo(AuthLoadingScreen);
