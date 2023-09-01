import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';

import { SlideData } from '../shared/param-types';
import { Colors } from '../constants/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  data: SlideData[];
  onComplete: () => void;
};

const Slides = ({ data, onComplete }: Props): JSX.Element => {
  const renderSlides = () => {
    return data.map((slide, index) => {
      return (
        <View
          key={index}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}>
          <Text style={styles.slideText}>{slide.text}</Text>
          {slide.renderButton && (
            <Button
              color={styles.button.color}
              title="Press here to start!"
              onPress={onComplete}
            />
          )}
        </View>
      );
    });
  };

  return (
    <ScrollView horizontal pagingEnabled style={styles.slideContainer}>
      {renderSlides()}
    </ScrollView>
  );
};

export default Slides;

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    padding: 10,
    color: Colors.primary50,
  },
  button: {
    color: Colors.primary50,
  },
});
