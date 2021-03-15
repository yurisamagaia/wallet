import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../utils/theme';
import { Navigation } from '../utils/types';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';

type Props = {
  children: React.ReactNode;
  backButton?: string;
  logoutButton?: boolean;
  nav: Navigation;
};

const Header = ({ children, backButton, logoutButton, nav }: Props) => {
  const renderBackButton = () => {
    if (backButton) {
      return (
        <BackButton goBack={() => nav.navigate(backButton)} />
      )
    }
  }
  const renderLogoutButton = () => {
    if (logoutButton) {
      return (
        <LogoutButton />
      )
    }
  }
  return (
    <View style={styles.header}>
      {renderBackButton()}
      <Text style={styles.text}>{children}</Text>
      {renderLogoutButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%'
  },
  text: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: 'center'
  },
});

export default Header;
