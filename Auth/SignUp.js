import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { themeColors, commonStyles } from '../config/theme';
import Snackbar from './Snackbar';
import { storeUserSession } from './session';

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'info' });

  const handleSignUp = async () => {
    if (password.length < 6) {
      setSnackbar({ visible: true, message: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }
    setIsLoading(true);
    const email = fullName.toLowerCase().replace(/\s+/g, '') + '@premsabha.com';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      setSnackbar({ visible: true, message: 'Account created!', type: 'success' });
      await storeUserSession({ name: fullName, email });
      navigation.replace('MainApp', { user: { name: fullName, email } });
    } catch (error) {
      setSnackbar({ visible: true, message: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={themeColors.accent} />
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us today</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.signUpButton, isLoading && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: commonStyles.safeArea,
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: themeColors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: themeColors.textSecondary,
    textAlign: 'center',
  },
  form: {
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 8,
  },
  input: commonStyles.input,
  signUpButton: commonStyles.primaryButton,
  disabledButton: {
    backgroundColor: themeColors.primaryLighter,
  },
  signUpButtonText: {
    color: themeColors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 16,
    color: themeColors.textSecondary,
  },
  linkText: {
    fontSize: 16,
    color: themeColors.accent,
    fontWeight: '600',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: themeColors.backgroundTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logoImage: {
    width: 56,
    height: 56,
    marginBottom: 8,
    alignSelf: 'center',
  },
});

export default SignUp;
