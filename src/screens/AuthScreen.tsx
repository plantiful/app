import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Apple from '../../assets/images/auth-screen/apple.svg';
import Google from '../../assets/images/auth-screen/google.svg';
import Facebook from '../../assets/images/auth-screen/facebook.svg';
import TopRight from '../../assets/images/auth-screen/top-right.svg';
import BottomLeft from '../../assets/images/auth-screen/bottom-left.svg';
import { colors, fonts, fontSizes } from '../utils/colors';

const AuthScreen = () => {
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const renderButton = (Icon, text, onPress, bgColor, paddingRight = 10, style = {}) => (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }, style]} onPress={onPress}>
      {Icon && <Icon width={24} height={24} style={{ marginRight: paddingRight }} />}
      <Text style={[styles.buttonText, bgColor === colors.primary ? styles.whiteText : {}]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
        <TopRight width={275} height={550} style={styles.topRight} />
        <BottomLeft width={350} height={700} style={styles.bottomLeft} />

        {renderButton(Apple, 'Pokračovat pomocí účtu Apple', null, colors.background)}
        {renderButton(Google, 'Pokračovat pomocí účtu Google', null, colors.background)}
        {renderButton(Facebook, 'Pokračovat pomocí účtu Facebook', null, colors.background, 5)}
        {renderButton(null, 'Registrovat se pomocí emailu', navigateToRegister, colors.primary, 10, { borderTopRightRadius: 0 })}

        <View style={styles.line} />
        <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.textButton}>Přihlásit se</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.background,
        },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 280,
      height: 50,
      borderRadius: 17,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      elevation: 2,
    },
    buttonText: {
      fontFamily: fonts.regular,
      fontSize: fontSizes.medium,
    },
    whiteText: {
      color: colors.textWhite,
    },
    line: {
      width: 280,
      height: 1,
      borderRadius: 1,
      backgroundColor: colors.textBlack,
      opacity: 0.3,
      marginVertical: 5,
    },
    textButton: {
      color: colors.textBlack,
      fontFamily: fonts.regular,
      fontSize: fontSizes.medium,
    },
    topRight: {
      position: 'absolute',
      top: -50,
      right: -50,
    },
    bottomLeft: {
      position: 'absolute',
      bottom: -75,
      left: -50,
    },
  });

export default AuthScreen;
