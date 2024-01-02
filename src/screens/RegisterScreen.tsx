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
import i18n from '../../assets/translations/i18n';
import { auth } from '../firebaseConfig';

// SVG icons
import BackArrow from '../../assets/images/RegisterScreen/BackArrow.svg';
import Plant from '../../assets/images/RegisterScreen/Plant.svg';

const RegisterScreen = () => {
  const { t } = i18n;
  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);
  const confirmPasswordRef = useRef<TextInput>(null!);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <BackArrow width={30} height={30} />
          <Text style={styles.backButtonText}>
            {t('RegisterScreen_back_button')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('RegisterScreen_name_input') as string}
          placeholderTextColor={colors.textBlack + '66'}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          onChangeText={text => setName(text)}
        />
        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder={t('RegisterScreen_email_input') as string}
          placeholderTextColor={colors.textBlack + '66'}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          secureTextEntry
          placeholder={t('RegisterScreen_password_input') as string}
          placeholderTextColor={colors.textBlack + '66'}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          ref={confirmPasswordRef}
          style={styles.input}
          secureTextEntry
          placeholder={t('RegisterScreen_password_repeat_input') as string}
          placeholderTextColor={colors.textBlack + '66'}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Plant width={100} height={100} style={styles.plant} />
        <TouchableOpacity onPress={handleRegister} style={[styles.registerButton, styles.authButton]}>
          <Text style={styles.registerButtonText}>
            {t('RegisterScreen_register_button')}
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
  registerButton: {
    width: 280,
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.large,
    color: colors.textWhite,
  },
});

export default RegisterScreen;
