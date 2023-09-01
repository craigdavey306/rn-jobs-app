import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { Colors } from '../constants/styles';
import { createUser } from '../utils/auth';
import { authenticate } from '../store';
import { useAppDispatch } from '../shared/hooks';

const SignupScreen = () => {
  const dispatch = useAppDispatch();

  async function signupHandler(email: string, password: string) {
    try {
      const token = await createUser(email, password);
      dispatch(authenticate({ token }));
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not create new account. Please check your credentials and try again.',
      );
    }
  }

  return (
    <View style={styles.container}>
      <AuthContent isLogin={false} onAuthenticate={signupHandler} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});
