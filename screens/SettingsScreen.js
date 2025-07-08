import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';

const settingsItems = [
  {
    id: 'faq',
    title: 'FAQ',
    icon: 'help-circle-outline',
    onPress: () => Alert.alert('FAQ', 'Frequently Asked Questions coming soon!'),
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: 'lock-closed-outline',
    onPress: () => Alert.alert('Privacy Policy', 'Privacy Policy coming soon!'),
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    icon: 'document-text-outline',
    onPress: () => Alert.alert('Terms & Conditions', 'Terms & Conditions coming soon!'),
  },
];

const SettingsScreen = () => {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={commonStyles.headingLarge}>Settings</Text>
        <View style={styles.section}>
          {settingsItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={item.onPress}
              accessibilityLabel={item.title}
            >
              <Ionicons name={item.icon} size={28} color={themeColors.accent} style={styles.icon} />
              <Text style={styles.cardText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={themeColors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginTop: 32,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 18,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    color: themeColors.textPrimary,
    fontWeight: '600',
  },
});

export default SettingsScreen; 