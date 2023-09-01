import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import AuthForm from './AuthForm';
import FlatButton from '../ui/FlatButton';
import { Colors } from '../../constants/styles';
import { AuthCredentialState, EnteredCredentials } from '../../models';
import { RootTabParamList } from '../../shared/param-types';
import { isValidEmail, isValidPassword } from '../../utils/auth';

type AuthContentProps = {
  isLogin: boolean;
  onAuthenticate: (email: string, password: string) => void;
};

const AuthContent = ({ isLogin, onAuthenticate }: AuthContentProps) => {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const [credentialState, setCredentialState] = useState<AuthCredentialState>({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate('Signup');
    } else {
      navigation.navigate('Login');
    }
  }

  function submitHandler(credentials: EnteredCredentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    // validation here
    const emailIsValid = isValidEmail(email);
    const passwordIsValid = isValidPassword(password);
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check the credentials you entered.');
      setCredentialState({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    onAuthenticate(email, password);
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        credentialValidity={credentialState}
        onSubmit={submitHandler}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Sign In'}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 12,
    alignItems: 'center',
  },
});
