import React from 'react';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Colors } from '../../constants/styles';

type InputProps = {
  label: string;
  onUpdateValue: (enteredValue: string) => void;
  value: string;
  isInvalid: boolean;
  autoComplete?: TextInputProps['autoComplete'];
  keyboardType?: KeyboardType;
  secure?: boolean;
};

const AuthContent = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  autoComplete,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        autoComplete={autoComplete}
      />
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.primary50,
    marginBottom: 4,
    marginLeft: 3,
  },
  labelInvalid: {
    color: Colors.error800,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: Colors.primary50,
    color: Colors.primary900,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
