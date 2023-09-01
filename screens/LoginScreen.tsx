import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { Colors } from '../constants/styles';
import { login } from '../utils/auth';
import { authenticate } from '../store';
import { useAppDispatch } from '../shared/hooks';

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  async function loginHandler(email: string, password: string) {
    try {
      const token = await login(email, password);
      dispatch(authenticate({ token }));
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please double check your credentials and try again.',
      );
    }
  }

  return (
    <View style={styles.container}>
      <AuthContent isLogin={true} onAuthenticate={loginHandler} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});
