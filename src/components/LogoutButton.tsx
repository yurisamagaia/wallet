import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { logoutUser } from "../api";

const LogoutButton = () => (
  <TouchableOpacity onPress={() => logoutUser()} style={styles.container}>
    <Image style={styles.image} source={require('../assets/logout.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15,
    right: 0
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default LogoutButton;
