import React, { useEffect } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { themeColors } from '../config/theme';

const Snackbar = ({ visible, message, type = 'info', onDismiss }) => {
  const translateY = React.useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      const timer = setTimeout(() => {
        onDismiss && onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      Animated.spring(translateY, {
        toValue: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  let backgroundColor = themeColors.info;
  if (type === 'error') backgroundColor = themeColors.error;
  if (type === 'success') backgroundColor = themeColors.success;

  return (
    <Animated.View style={[styles.container, { backgroundColor, transform: [{ translateY }] }]}> 
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 40,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    color: themeColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Snackbar; 