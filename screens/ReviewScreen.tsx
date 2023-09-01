import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { ReviewJobStackParamList } from '../shared/param-types';

type Props = NativeStackScreenProps<ReviewJobStackParamList>;

const ReviewScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    const headerRightButton = () => {
      return (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      );
    };
    navigation.setOptions({
      title: 'Review Jobs',
      headerRight: () => headerRightButton(),
    });
  }, [navigation]);

  return (
    <View>
      <Text>ReviewScreen</Text>
      <Text>ReviewScreen</Text>
      <Text>ReviewScreen</Text>
      <Text>ReviewScreen</Text>
      <Text>ReviewScreen</Text>
    </View>
  );
};

export default ReviewScreen;
