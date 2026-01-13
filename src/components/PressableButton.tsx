import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary';

interface PressableButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export const PressableButton: React.FC<PressableButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const variantStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
  };
  const variantStyle = variantStyles[variant];
  const variantTextStyle = styles[`${variant}Text` as const];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.textBase, variantTextStyle, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },

  pressed: {
    opacity: 0.75,
  },

  disabled: {
    opacity: 0.5,
  },

  /* ===== VARIANTS ===== */

  primary: {
    backgroundColor: '#0e1627', 
  },

  primaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  secondary: {
    backgroundColor: '#E5E7EB', 
  },

  secondaryText: {
    color: '#111827',
    fontWeight: '600',
  },

  /* ===== BASE TEXT ===== */

  textBase: {
    fontSize: 16,
  },
});
