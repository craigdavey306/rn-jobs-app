import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Input from './Input';
import Button from '../ui/Button';
import { AuthCredentialState, EnteredCredentials } from '../../models';

type InputType = 'confirmEmail' | 'confirmPassword' | 'email' | 'password';
type AuthFormProps = {
  isLogin: boolean;
  credentialValidity: AuthCredentialState;
  onSubmit: (credentials: EnteredCredentials) => void;
};

const AuthForm = ({ isLogin, credentialValidity, onSubmit }: AuthFormProps) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDoNotMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDoNotMatch,
  } = credentialValidity;

  function updateInputValueHandler(inputType: InputType, enteredValue: string) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <Input
        label="Email Address"
        onUpdateValue={updateInputValueHandler.bind(this, 'email')}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
        autoComplete="email"
      />
      {!isLogin && (
        <Input
          label="Confirm Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
          value={enteredConfirmEmail}
          keyboardType="email-address"
          isInvalid={emailsDoNotMatch}
        />
      )}
      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, 'password')}
        secure
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'confirmPassword')}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDoNotMatch}
        />
      )}
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? 'Log In' : 'Sign Up'}
        </Button>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
