import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
  Modal,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { themeColors, commonStyles } from '../config/theme';
import { contentApi } from '../config/api';
import Snackbar from '../Auth/Snackbar';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

const KirtanPlayerScreen = ({ navigation }) => {
  // State management
  const [kirtans, setKirtans] = useState([]);
  const [filteredKirtans, setFilteredKirtans] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentKirtan, setCurrentKirtan] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'info' });
  const [isPlayerModalVisible, setPlayerModalVisible] = useState(false);
  const [isTogglingPlayback, setIsTogglingPlayback] = useState(false);

  // Enable background audio playback
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    // Note: For lock screen controls, consider migrating to react-native-track-player
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch(() => {});
      }
    };
  }, [sound]);

  // Fetch kirtans from API
  const fetchKirtans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = null;
      const result = await contentApi.getAllContent(token);
      if (result.success && Array.isArray(result.data.kirtans)) {
        const kirtans = result.data.kirtans.map((k, idx) => ({
          id: idx.toString(),
          title: k.title,
          singer: k.singer,
          downloadUrl: k.downloadUrl,
        }));
        setKirtans(kirtans);
        setFilteredKirtans(kirtans);
      } else {
        setError(result.error || 'Invalid data from server.');
        setKirtans([]);
        setFilteredKirtans([]);
      }
    } catch (error) {
      setError('Failed to load kirtans. Please check your connection.');
      setKirtans([]);
      setFilteredKirtans([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories (stubbed for now)
  const fetchCategories = async () => {
    setCategories(['All']);
  };

  useEffect(() => {
    fetchKirtans();
    fetchCategories();
  }, []);

  // Play selected kirtan
  const playKirtan = async (kirtan, index) => {
    if (!kirtan || !kirtan.downloadUrl) {
      setSnackbar({ visible: true, message: 'No audio file found for this kirtan.', type: 'error' });
      return;
    }
    try {
      setIsLoadingAudio(true);
      setError(null);
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: kirtan.downloadUrl },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            setCurrentTime(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
          } else if (status.error) {
            setError('Playback error: ' + status.error);
            setSnackbar({ visible: true, message: 'Playback error: ' + status.error, type: 'error' });
          }
        }
      );
      setSound(newSound);
      setCurrentKirtan(kirtan);
      setCurrentIndex(index);
      setIsPlaying(true);
      setCurrentTime(0);
      setSnackbar({ visible: true, message: `Now playing: ${kirtan.title}`, type: 'success' });
    } catch (error) {
      setError('Could not play audio.');
      setSnackbar({ visible: true, message: 'Could not play audio.', type: 'error' });
    } finally {
      setIsLoadingAudio(false);
    }
  };

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (!sound || isTogglingPlayback) return;
    setIsTogglingPlayback(true);
    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      setError('Playback error.');
      setSnackbar({ visible: true, message: 'Could not toggle playback.', type: 'error' });
    } finally {
      setIsTogglingPlayback(false);
    }
  };

  // Skip to next kirtan
  const skipToNext = async () => {
    if (filteredKirtans.length === 0) return;
    const nextIndex = (currentIndex + 1) % filteredKirtans.length;
    playKirtan(filteredKirtans[nextIndex], nextIndex);
  };

  // Skip to previous kirtan
  const skipToPrevious = async () => {
    if (filteredKirtans.length === 0) return;
    const prevIndex = currentIndex === 0 ? filteredKirtans.length - 1 : currentIndex - 1;
    playKirtan(filteredKirtans[prevIndex], prevIndex);
  };

  // Search kirtans
  const searchKirtans = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredKirtans(kirtans);
      return;
    }
    const filtered = kirtans.filter(kirtan =>
      kirtan.title.toLowerCase().includes(query.toLowerCase()) ||
      (kirtan.singer && kirtan.singer.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredKirtans(filtered);
  };

  // Filter by category (stubbed)
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setFilteredKirtans(kirtans); // Only 'All' for now
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render a single kirtan item
  const renderKirtanItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.kirtanItem}
      onPress={() => playKirtan(item, index)}
      accessibilityLabel={`Play ${item.title} by ${item.singer}`}
    >
      <View style={styles.kirtanThumbnail}>
        <Ionicons name="musical-notes" size={24} color={themeColors.primary} />
      </View>
      <View style={styles.kirtanInfo}>
        <Text style={styles.kirtanTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.kirtanArtist} numberOfLines={1}>
          {item.singer}
        </Text>
      </View>
      <View style={styles.kirtanActions}>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={16} color="#3498db" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Now Playing Bar (basic)
  const NowPlayingBar = () => (
    currentKirtan ? (
      <TouchableOpacity style={styles.nowPlayingBar} onPress={() => setPlayerModalVisible(true)} activeOpacity={0.9}>
        <View style={styles.nowPlayingInfo}>
          <Image source={require('../assets/music-logo.png')} style={styles.musicLogo} resizeMode="contain" />
          <View style={styles.nowPlayingText}>
            <Text style={styles.nowPlayingTitle} numberOfLines={1}>{currentKirtan.title}</Text>
            <Text style={styles.nowPlayingArtist} numberOfLines={1}>{currentKirtan.singer}</Text>
            <Text style={styles.nowPlayingTime}>{formatTime(currentTime)} / {formatTime(duration)}</Text>
          </View>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={skipToPrevious} accessibilityLabel="Previous">
            <Ionicons name="play-skip-back" size={24} color={themeColors.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}
            disabled={isLoadingAudio || isTogglingPlayback}
            accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          >
            {isTogglingPlayback ? (
              <ActivityIndicator size={28} color={themeColors.textPrimary} />
            ) : (
              <Ionicons
                name={isLoadingAudio ? 'hourglass-outline' : isPlaying ? 'pause' : 'play'}
                size={28}
                color={themeColors.textPrimary}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={skipToNext} accessibilityLabel="Next">
            <Ionicons name="play-skip-forward" size={24} color={themeColors.accent} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ) : null
  );

  // Main render
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {(isLoading || isLoadingAudio) && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={themeColors.accent} />
        </View>
      )}
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
            onChangeText={searchKirtans}
            placeholderTextColor={themeColors.textMuted}
            accessibilityLabel="Search kirtans"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => searchKirtans('')} accessibilityLabel="Clear search">
              <Ionicons name="close-circle" size={20} color={themeColors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories (stubbed) */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Kirtans List */}
      {isLoading ? (
        <ActivityIndicator size="large" color={themeColors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      ) : filteredKirtans.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
          <Text>No kirtans found.</Text>
        </View>
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
      <NowPlayingBar />

      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
      />

      {/* Add the modal player UI */}
      <Modal
        visible={isPlayerModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPlayerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setPlayerModalVisible(false)}>
              <Ionicons name="close" size={28} color={themeColors.textPrimary} />
            </TouchableOpacity>
            <Image source={require('../assets/music-logo.png')} style={styles.musicLogo} resizeMode="contain" />
            <Text style={styles.modalTitle} numberOfLines={2}>{currentKirtan?.title}</Text>
            <Text style={styles.modalArtist}>{currentKirtan?.singer}</Text>
            {/* Progress Bar (replace with Slider) */}
            <View style={styles.progressBarContainer}>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                minimumTrackTintColor={themeColors.accent}
                maximumTrackTintColor={themeColors.backgroundCard}
                thumbTintColor={themeColors.accent}
                onSlidingComplete={async (value) => {
                  if (sound && duration) {
                    try {
                      await sound.setPositionAsync(value * 1000);
                      setCurrentTime(value);
                    } catch (e) {
                      setSnackbar({ visible: true, message: 'Seek failed', type: 'error' });
                    }
                  }
                }}
                disabled={!sound || isLoadingAudio}
              />
              <View style={styles.progressTimeRow}>
                <Text style={styles.progressTime}>{formatTime(currentTime)}</Text>
                <Text style={styles.progressTime}>{formatTime(duration)}</Text>
              </View>
            </View>
            {/* Controls */}
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.modalControlButton} onPress={skipToPrevious}>
                <Ionicons name="play-skip-back" size={36} color={themeColors.accent} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalPlayPauseButton}
                onPress={togglePlayPause}
                disabled={isLoadingAudio || isTogglingPlayback}
              >
                {isTogglingPlayback ? (
                  <ActivityIndicator size={48} color={themeColors.textPrimary} />
                ) : (
                  <Ionicons
                    name={isLoadingAudio ? 'hourglass-outline' : isPlaying ? 'pause' : 'play'}
                    size={48}
                    color={themeColors.textPrimary}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalControlButton} onPress={skipToNext}>
                <Ionicons name="play-skip-forward" size={36} color={themeColors.accent} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  musicLogo: {
    width: 48,
    height: 48,
    marginRight: 12,
    marginBottom: 5,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',

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
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: themeColors.backgroundTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: themeColors.backgroundTransparent,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: themeColors.backgroundCard,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  modalClose: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 2,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalArtist: {
    fontSize: 18,
    color: themeColors.textSecondary,
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 16,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: themeColors.backgroundLight,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: themeColors.accent,
  },
  progressTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressTime: {
    fontSize: 12,
    color: themeColors.textMuted,
  },
  modalControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  modalControlButton: {
    marginHorizontal: 24,
  },
  modalPlayPauseButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: themeColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
});

export default KirtanPlayerScreen; 