import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';

type IconButtonProps = {
  icon: string;
  color: string | undefined;
  size: number;
  ariaLabel?: string;
  onPress: () => void;
};

function IconButton({
  icon,
  ariaLabel,
  color,
  size,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      aria-label={ariaLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Icon name={icon} color={color} size={size} type="material" />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
