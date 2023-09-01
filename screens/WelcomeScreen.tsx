import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Slides from '../components/Slides';
import { SlideData } from '../shared/param-types';
import { RootTabParamList } from '../shared/param-types';
import { Colors } from '../constants/styles';

type Props = NativeStackScreenProps<RootTabParamList>;

const SLIDE_DATA: SlideData[] = [
  { text: 'Welcome to JobApp', color: Colors.primary800 },
  { text: 'Use this to get a job', color: Colors.primary900 },
  {
    text: 'Set your location, then swipe away',
    color: Colors.primary800,
    renderButton: true,
  },
];

const WelcomeScreen = ({ navigation }: Props) => {
  const onSlidesComplete = () => {
    navigation.navigate('Login');
  };

  return <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} />;
};

export default WelcomeScreen;
