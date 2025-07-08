import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';

const ProfileScreen = ({ navigation, user }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const userProfile = {
    name: user?.name || 'Devotee User',
    email: user?.email || 'devotee@example.com',
    avatar: '🕉️',
    memberSince: '2024',
    totalReadings: 45,
    totalKirtans: 23,
    favoriteCategory: 'Vachanamrut',
  };

  const menuItems = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: 'person-outline',
      action: () => Alert.alert('Account', 'Account settings coming soon!'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications-outline',
      action: () => Alert.alert('Notifications', 'Notification settings coming soon!'),
      hasToggle: true,
      toggleValue: notificationsEnabled,
      onToggleChange: setNotificationsEnabled,
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: 'color-palette-outline',
      action: () => Alert.alert('Appearance', 'Appearance settings coming soon!'),
      hasToggle: true,
      toggleValue: darkModeEnabled,
      onToggleChange: setDarkModeEnabled,
    },
    {
      id: 'autoplay',
      title: 'Auto-play Kirtans',
      icon: 'play-circle-outline',
      action: () => Alert.alert('Auto-play', 'Auto-play settings coming soon!'),
      hasToggle: true,
      toggleValue: autoPlayEnabled,
      onToggleChange: setAutoPlayEnabled,
    },
    {
      id: 'downloads',
      title: 'Downloads',
      icon: 'download-outline',
      action: () => Alert.alert('Downloads', 'Downloaded content coming soon!'),
    },
    {
      id: 'favorites',
      title: 'Favorites',
      icon: 'heart-outline',
      action: () => Alert.alert('Favorites', 'Your favorites coming soon!'),
    },
    {
      id: 'reading-history',
      title: 'Reading History',
      icon: 'time-outline',
      action: () => Alert.alert('History', 'Reading history coming soon!'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      action: () => Alert.alert('Help', 'Help and support coming soon!'),
    },
    {
      id: 'about',
      title: 'About Sabha App',
      icon: 'information-circle-outline',
      action: () => Alert.alert('About', 'About Sabha App coming soon!'),
    },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.action}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <Ionicons name={item.icon} size={20} color={themeColors.accent} />
        </View>
        <Text style={styles.menuTitle}>{item.title}</Text>
      </View>
      
      {item.hasToggle ? (
        <Switch
          value={item.toggleValue}
          onValueChange={item.onToggleChange}
          trackColor={{ false: themeColors.backgroundLight, true: themeColors.primaryLighter }}
          thumbColor={item.toggleValue ? themeColors.primary : themeColors.textMuted}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={themeColors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.greetingText}>Jai Swaminarayan, {userProfile.name || 'Devotee'}!</Text>
        </View>

        {/* User Profile Card */}
        <View style={[commonStyles.card, styles.profileCard]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={require('../assets/logo.png')} style={styles.avatarImage} resizeMode="contain" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={commonStyles.headingMedium}>{userProfile.name}</Text>
              <Text style={styles.profileEmail}>{userProfile.email}</Text>
              <Text style={styles.profileMemberSince}>
                Member since {userProfile.memberSince}
              </Text>
            </View>
          </View>
        </View>

        {/* Log Out Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
            <Ionicons name="log-out-outline" size={20} color={themeColors.textPrimary} style={{ marginRight: 8 }} />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greetingContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  logoImage: {
    width: 56,
    height: 56,
    marginBottom: 8,
    alignSelf: 'center',
  },
  greetingText: {
    fontSize: 20,
    color: themeColors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: themeColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: themeColors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: themeColors.primaryLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 48,
    height: 48,
  },
  profileInfo: {
    flex: 1,
  },
  profileEmail: {
    fontSize: 14,
    color: themeColors.textSecondary,
    marginTop: 4,
  },
  profileMemberSince: {
    fontSize: 12,
    color: themeColors.textMuted,
    marginTop: 2,
  },
  menuContainer: {
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 16,
    marginTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.backgroundLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: themeColors.textPrimary,
  },
});

export default ProfileScreen; 