import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image style={styles.image} source={require('../assets/arrow_back.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 18,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
