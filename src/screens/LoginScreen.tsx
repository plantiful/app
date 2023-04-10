import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors, fonts, fontSizes } from '../utils/colors';
import { RootStackParamList } from '../utils/types';
import i18n from './../../translations/i18n';
import { auth } from './../../firebaseConfig';

// SVG icons
import BackArrow from '../../assets/images/RegisterScreen/BackArrow.svg';
import Plant from '../../assets/images/RegisterScreen/Plant.svg';


const LoginScreen = () => {
  const { t } = i18n;
  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToForgotPassword = () => {
    // navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <View style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <BackArrow width={30} height={30} />
          <Text style={styles.backButtonText}>
            {t('LoginScreen_back_button')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder={t('LoginScreen_email_input') as string}
          placeholderTextColor={colors.textBlack + '66'}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          secureTextEntry
          placeholder={t('LoginScreen_password_input') as string}
          placeholderTextColor={colors.textBlack + '66'}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text style={styles.forgotPasswordText}>
            {t('LoginScreen_forgot_password_button')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Plant width={100} height={100} style={styles.plant} />
        <TouchableOpacity onPress={handleLogin} style={[styles.loginButton, styles.authButton]}>
          <Text style={styles.loginButtonText}>
            {t('LoginScreen_login_button')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: -75,
  },
  backButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginLeft: 10,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: 280,
    height: 40,
    borderBottomWidth: 1,
    borderColor: colors.textBlack + '4D',
    marginBottom: 20,
    fontFamily: fonts.regular,
    fontSize: fontSizes.large,
    color: colors.textBlack,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plant: {
    marginBottom: -10,
  },
  authButton: {
    borderTopRightRadius: 0,
  },
  loginButton: {
    width: 280,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
  },
  loginButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.large,
    color: colors.textWhite,
  },
  forgotPasswordText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    color: colors.textBlack,
  },
});

export default LoginScreen;
