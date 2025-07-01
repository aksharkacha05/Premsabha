import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const recentReadings = [
    { id: 1, title: 'Vachanamrut - Gadhada I', progress: 75, lastRead: '2 hours ago' },
    { id: 2, title: 'Swamini Vato - Chapter 5', progress: 45, lastRead: '1 day ago' },
    { id: 3, title: 'Shikshapatri - Verses 1-50', progress: 90, lastRead: '3 days ago' },
  ];

  const recentKirtans = [
    { id: 1, title: 'Jai Shree Krishna', artist: 'Traditional', duration: '5:32' },
    { id: 2, title: 'Hare Krishna Hare Ram', artist: 'Traditional', duration: '8:15' },
    { id: 3, title: 'Govind Bolo Hari Gopal Bolo', artist: 'Traditional', duration: '6:42' },
  ];

  const quickActions = [
    {
      id: 'continue-reading',
      title: 'Continue Reading',
      subtitle: 'Resume your last reading',
      icon: 'book-outline',
      color: themeColors.primary,
      action: () => navigation.navigate('PDF Library'),
    },
    {
      id: 'daily-kirtan',
      title: 'Daily Kirtan',
      subtitle: 'Listen to today\'s kirtan',
      icon: 'musical-notes-outline',
      color: themeColors.accent,
      action: () => navigation.navigate('Kirtan Player'),
    },
    {
      id: 'favorites',
      title: 'Favorites',
      subtitle: 'Your saved content',
      icon: 'heart-outline',
      color: themeColors.primaryLighter,
      action: () => Alert.alert('Favorites', 'Favorites feature coming soon!'),
    },
    {
      id: 'search',
      title: 'Search',
      subtitle: 'Find sacred texts & kirtans',
      icon: 'search-outline',
      color: themeColors.accentBeige,
      action: () => Alert.alert('Search', 'Search feature coming soon!'),
    },
  ];

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={[styles.quickActionCard, { borderLeftColor: action.color }]}
      onPress={action.action}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
        <Ionicons name={action.icon} size={24} color={themeColors.textPrimary} />
      </View>
      <View style={styles.quickActionContent}>
        <Text style={styles.quickActionTitle}>{action.title}</Text>
        <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={themeColors.textMuted} />
    </TouchableOpacity>
  );

  const renderReadingItem = (reading) => (
    <TouchableOpacity key={reading.id} style={styles.readingItem}>
      <View style={styles.readingInfo}>
        <Text style={styles.readingTitle} numberOfLines={1}>
          {reading.title}
        </Text>
        <Text style={styles.readingMeta}>{reading.lastRead}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${reading.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{reading.progress}%</Text>
      </View>
    </TouchableOpacity>
  );

  const renderKirtanItem = (kirtan) => (
    <TouchableOpacity key={kirtan.id} style={styles.kirtanItem}>
      <View style={styles.kirtanThumbnail}>
        <Text style={styles.kirtanIcon}>🕉️</Text>
      </View>
      <View style={styles.kirtanInfo}>
        <Text style={styles.kirtanTitle} numberOfLines={1}>
          {kirtan.title}
        </Text>
        <Text style={styles.kirtanArtist}>{kirtan.artist}</Text>
      </View>
      <Text style={styles.kirtanDuration}>{kirtan.duration}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={commonStyles.headingLarge}>Jai Swaminarayan</Text>
            <Text style={styles.headerSubtitle}>
              Welcome to your devotional journey
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="notifications-outline" size={24} color={themeColors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="settings-outline" size={24} color={themeColors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={commonStyles.headingSmall}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Recent Readings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.headingSmall}>Recent Readings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PDF Library')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.readingsContainer}>
            {recentReadings.map(renderReadingItem)}
          </View>
        </View>

        {/* Recent Kirtans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.headingSmall}>Recent Kirtans</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Kirtan Player')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.kirtansContainer}>
            {recentKirtans.map(renderKirtanItem)}
          </View>
        </View>

        {/* Daily Quote */}
        <View style={[commonStyles.card, styles.quoteCard]}>
          <Text style={styles.quoteIcon}>🕉️</Text>
          <Text style={styles.quoteText}>
            "The true devotee is one who serves God with love and devotion, 
            without expecting anything in return."
          </Text>
          <Text style={styles.quoteSource}>- Sacred Wisdom</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  headerContent: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: themeColors.textSecondary,
    marginTop: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: themeColors.accent,
    fontWeight: '600',
  },
  quickActionsGrid: {
    gap: 12,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
  readingsContainer: {
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 16,
    padding: 16,
  },
  readingItem: {
    marginBottom: 16,
  },
  readingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  readingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.textPrimary,
    flex: 1,
  },
  readingMeta: {
    fontSize: 12,
    color: themeColors.textMuted,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: themeColors.backgroundLight,
    borderRadius: 2,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: themeColors.accent,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: themeColors.accent,
    fontWeight: '600',
    minWidth: 30,
  },
  kirtansContainer: {
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 16,
    padding: 16,
  },
  kirtanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  kirtanThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  kirtanIcon: {
    fontSize: 16,
  },
  kirtanInfo: {
    flex: 1,
  },
  kirtanTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.textPrimary,
    marginBottom: 2,
  },
  kirtanArtist: {
    fontSize: 12,
    color: themeColors.textSecondary,
  },
  kirtanDuration: {
    fontSize: 12,
    color: themeColors.textMuted,
  },
  quoteCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  quoteIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 16,
    color: themeColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  quoteSource: {
    fontSize: 14,
    color: themeColors.accent,
    fontWeight: '600',
  },
});

export default HomeScreen; 