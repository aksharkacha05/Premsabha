import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { themeColors, commonStyles } from '../config/theme';
import { kirtanApi } from '../config/api';

const { width } = Dimensions.get('window');

const KirtanPlayerScreen = ({ navigation }) => {
  // State management
  const [kirtans, setKirtans] = useState([]);
  const [filteredKirtans, setFilteredKirtans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Audio player states
  const [sound, setSound] = useState(null);
  const [currentKirtan, setCurrentKirtan] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Fetch kirtans from API or fallback to demo data
  const fetchKirtans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Replace with actual token retrieval if needed
      const token = null;
      const result = await kirtanApi.getAllKirtans(token);
      if (result.success) {
        setKirtans(result.data);
        setFilteredKirtans(result.data);
      } else {
        setError(result.error);
        setKirtans(getDemoKirtans());
        setFilteredKirtans(getDemoKirtans());
      }
    } catch (error) {
      setError('Failed to load kirtans');
      setKirtans(getDemoKirtans());
      setFilteredKirtans(getDemoKirtans());
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories from API or fallback
  const fetchCategories = async () => {
    try {
      const token = null;
      const result = await kirtanApi.getKirtanCategories(token);
      if (result.success) {
        setCategories(['All', ...result.data]);
      } else {
        setCategories(['All', 'Bhajans', 'Mantras', 'Kirtans', 'Aartis', 'Stotras']);
      }
    } catch (error) {
      setCategories(['All', 'Bhajans', 'Mantras', 'Kirtans', 'Aartis', 'Stotras']);
    }
  };

  // Search kirtans
  const searchKirtans = async (query) => {
    if (!query.trim()) {
      setFilteredKirtans(kirtans);
      return;
    }
    try {
      setIsSearching(true);
      const token = null;
      const result = await kirtanApi.searchKirtans(query, token);
      if (result.success) {
        setFilteredKirtans(result.data);
      } else {
        // Fallback to local search
        const filtered = kirtans.filter(kirtan =>
          kirtan.title.toLowerCase().includes(query.toLowerCase()) ||
          kirtan.artist.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredKirtans(filtered);
      }
    } catch (error) {
      // Fallback to local search
      const filtered = kirtans.filter(kirtan =>
        kirtan.title.toLowerCase().includes(query.toLowerCase()) ||
        kirtan.artist.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredKirtans(filtered);
    } finally {
      setIsSearching(false);
    }
  };

  // Filter by category
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredKirtans(kirtans);
    } else {
      const filtered = kirtans.filter(kirtan => kirtan.category === category);
      setFilteredKirtans(filtered);
    }
  };

  // Demo data fallback
  const getDemoKirtans = () => [
    {
      id: '1',
      title: 'Sample Kirtan',
      artist: 'Traditional',
      category: 'Kirtans',
      duration: '5:32',
      thumbnail: '🕉️',
      audioUrl: require('../assets/Kirtans/Aankhthi_Yogi_Bapane_me_Joya.mp3'),
    },
    {
      id: '2',
      title: 'Hare Krishna Hare Ram',
      artist: 'Traditional',
      category: 'Mantras',
      duration: '8:15',
      thumbnail: '🕉️',
      audioUrl: null,
    },
    {
      id: '3',
      title: 'Govind Bolo Hari Gopal Bolo',
      artist: 'Traditional',
      category: 'Kirtans',
      duration: '6:42',
      thumbnail: '🕉️',
      audioUrl: null,
    },
    {
      id: '4',
      title: 'Aarti Kunj Bihari Ki',
      artist: 'Traditional',
      category: 'Aartis',
      duration: '4:18',
      thumbnail: '🕉️',
      audioUrl: null,
    },
  ];

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Update playback status
  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
          setCurrentTime(status.positionMillis / 1000);
          setDuration(status.durationMillis / 1000);
        }
      });
    }
  }, [sound]);

  // Play selected kirtan
  const playKirtan = async (kirtan) => {
    try {
      setIsLoadingAudio(true);
      // Stop current audio if playing
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
      let source = kirtan.audioUrl;
      if (!source) {
        Alert.alert('No audio file found');
        return;
      }
      const { sound: newSound } = await Audio.Sound.createAsync(source);
      setSound(newSound);
      setCurrentKirtan(kirtan);
      setIsPlaying(true);
      setCurrentTime(0);
      await newSound.playAsync();
    } catch (error) {
      Alert.alert('Audio Error', 'Could not play audio.');
    } finally {
      setIsLoadingAudio(false);
    }
  };

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (!sound) return;
    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      Alert.alert('Playback Error', 'Could not toggle playback.');
    }
  };

  // Skip to next kirtan
  const skipToNext = async () => {
    if (currentKirtan) {
      const currentIndex = kirtans.findIndex(k => k.id === currentKirtan.id);
      const nextIndex = (currentIndex + 1) % kirtans.length;
      await playKirtan(kirtans[nextIndex]);
    }
  };

  // Skip to previous kirtan
  const skipToPrevious = async () => {
    if (currentKirtan) {
      const currentIndex = kirtans.findIndex(k => k.id === currentKirtan.id);
      const prevIndex = currentIndex === 0 ? kirtans.length - 1 : currentIndex - 1;
      await playKirtan(kirtans[prevIndex]);
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render a single kirtan item
  const renderKirtanItem = ({ item }) => (
    <TouchableOpacity
      style={styles.kirtanItem}
      onPress={() => playKirtan(item)}
      accessibilityLabel={`Play ${item.title} by ${item.artist}`}
    >
      <View style={styles.kirtanThumbnail}>
        <Text style={styles.thumbnailText}>{item.thumbnail}</Text>
      </View>
      <View style={styles.kirtanInfo}>
        <Text style={styles.kirtanTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.kirtanArtist} numberOfLines={1}>
          {item.artist} • {item.category}
        </Text>
      </View>
      <View style={styles.kirtanActions}>
        <Text style={styles.kirtanDuration}>{item.duration}</Text>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={16} color="#3498db" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Render a single category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategory
      ]}
      onPress={() => filterByCategory(item)}
      accessibilityLabel={`Filter by ${item}`}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.selectedCategoryText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Initial data fetch
  useEffect(() => {
    fetchKirtans();
    fetchCategories();
  }, []);

  // Search effect
  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        searchKirtans(searchQuery);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredKirtans(kirtans);
    }
  }, [searchQuery, kirtans]);

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={commonStyles.headingLarge}>Kirtan Player</Text>
        <Text style={styles.headerSubtitle}>Divine melodies for the soul</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={themeColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search kirtans..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={themeColors.textMuted}
            accessibilityLabel="Search kirtans"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} accessibilityLabel="Clear search">
              <Ionicons name="close-circle" size={20} color={themeColors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Kirtans List */}
      {isLoading ? (
        <ActivityIndicator size="large" color={themeColors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredKirtans}
          renderItem={renderKirtanItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.kirtansList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Now Playing Bar */}
      {currentKirtan && (
        <View style={styles.nowPlayingBar}>
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingThumbnail}>{currentKirtan.thumbnail}</Text>
            <View style={styles.nowPlayingText}>
              <Text style={styles.nowPlayingTitle} numberOfLines={1}>
                {currentKirtan.title}
              </Text>
              <Text style={styles.nowPlayingArtist} numberOfLines={1}>
                {currentKirtan.artist}
              </Text>
              <Text style={styles.nowPlayingTime}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={skipToPrevious} accessibilityLabel="Previous">
              <Ionicons name="play-skip-back" size={24} color={themeColors.accent} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={togglePlayPause}
              disabled={isLoadingAudio}
              accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
            >
              <Ionicons
                name={isLoadingAudio ? 'hourglass-outline' : isPlaying ? 'pause' : 'play'}
                size={28}
                color={themeColors.textPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={skipToNext} accessibilityLabel="Next">
              <Ionicons name="play-skip-forward" size={24} color={themeColors.accent} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: themeColors.textPrimary,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: themeColors.backgroundCard,
    borderWidth: 1,
    borderColor: themeColors.primaryLighter,
  },
  selectedCategory: {
    backgroundColor: themeColors.primary,
    borderColor: themeColors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: themeColors.textSecondary,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: themeColors.textPrimary,
  },
  kirtansList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  kirtanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kirtanThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  thumbnailText: {
    fontSize: 24,
  },
  kirtanInfo: {
    flex: 1,
  },
  kirtanTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  kirtanArtist: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
  kirtanActions: {
    alignItems: 'center',
  },
  kirtanDuration: {
    fontSize: 12,
    color: themeColors.textMuted,
    marginBottom: 8,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nowPlayingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: themeColors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: themeColors.primaryDarker,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nowPlayingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nowPlayingThumbnail: {
    fontSize: 20,
    marginRight: 12,
  },
  nowPlayingText: {
    flex: 1,
  },
  nowPlayingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: themeColors.textPrimary,
  },
  nowPlayingArtist: {
    fontSize: 12,
    color: themeColors.textSecondary,
  },
  nowPlayingTime: {
    fontSize: 12,
    color: themeColors.textMuted,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  playPauseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KirtanPlayerScreen; 