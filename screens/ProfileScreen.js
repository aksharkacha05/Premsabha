import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const userProfile = {
    name: 'Devotee User',
    email: 'devotee@example.com',
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={commonStyles.headingLarge}>Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your devotional journey</Text>
        </View>

        {/* User Profile Card */}
        <View style={[commonStyles.card, styles.profileCard]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{userProfile.avatar}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={commonStyles.headingMedium}>{userProfile.name}</Text>
              <Text style={styles.profileEmail}>{userProfile.email}</Text>
              <Text style={styles.profileMemberSince}>
                Member since {userProfile.memberSince}
              </Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color={themeColors.accent} />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.totalReadings}</Text>
              <Text style={styles.statLabel}>Readings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile.totalKirtans}</Text>
              <Text style={styles.statLabel}>Kirtans</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>

          {/* Favorite Category */}
          <View style={styles.favoriteCategory}>
            <Text style={styles.favoriteLabel}>Favorite Category:</Text>
            <Text style={styles.favoriteValue}>{userProfile.favoriteCategory}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={commonStyles.headingSmall}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="book-outline" size={24} color={themeColors.accent} />
              <Text style={styles.quickActionText}>Continue Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="play-outline" size={24} color={themeColors.accent} />
              <Text style={styles.quickActionText}>Resume Kirtan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="bookmark-outline" size={24} color={themeColors.accent} />
              <Text style={styles.quickActionText}>Bookmarks</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.section}>
          <Text style={commonStyles.headingSmall}>Settings</Text>
          <View style={styles.menuContainer}>
            {menuItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[commonStyles.primaryButton, styles.logoutButton]}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Login') }
              ]
            );
          }}
        >
          <Ionicons name="log-out-outline" size={20} color={themeColors.textPrimary} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Sabha App v1.0.0</Text>
          <Text style={styles.versionSubtext}>Devotional Journey Companion</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  headerSubtitle: {
    fontSize: 16,
    color: themeColors.textSecondary,
    marginTop: 8,
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
  avatar: {
    fontSize: 28,
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
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: themeColors.backgroundLight,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: themeColors.textMuted,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: themeColors.backgroundLight,
  },
  favoriteCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: themeColors.backgroundLight,
  },
  favoriteLabel: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
  favoriteValue: {
    fontSize: 14,
    color: themeColors.accent,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: themeColors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: themeColors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: themeColors.textMuted,
  },
  versionSubtext: {
    fontSize: 12,
    color: themeColors.textMuted,
    marginTop: 4,
  },
});

export default ProfileScreen; 