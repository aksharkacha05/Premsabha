import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';

const { width, height } = Dimensions.get('window');

const KirtanPlayerScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentKirtan, setCurrentKirtan] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const categories = ['All', 'Bhajans', 'Aartis', 'Stotras', 'Kirtans', 'Mantras'];

  const kirtans = [
    {
      id: '1',
      title: 'Jai Shree Krishna',
      artist: 'Traditional',
      category: 'Bhajans',
      duration: '5:32',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/jai-shree-krishna.mp3',
    },
    {
      id: '2',
      title: 'Hare Krishna Hare Ram',
      artist: 'Traditional',
      category: 'Mantras',
      duration: '8:15',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/hare-krishna.mp3',
    },
    {
      id: '3',
      title: 'Govind Bolo Hari Gopal Bolo',
      artist: 'Traditional',
      category: 'Kirtans',
      duration: '6:42',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/govind-bolo.mp3',
    },
    {
      id: '4',
      title: 'Aarti Kunj Bihari Ki',
      artist: 'Traditional',
      category: 'Aartis',
      duration: '4:18',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/aarti-kunj-bihari.mp3',
    },
    {
      id: '5',
      title: 'Shree Hanuman Chalisa',
      artist: 'Traditional',
      category: 'Stotras',
      duration: '12:35',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/hanuman-chalisa.mp3',
    },
    {
      id: '6',
      title: 'Radhe Radhe',
      artist: 'Traditional',
      category: 'Bhajans',
      duration: '7:23',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/radhe-radhe.mp3',
    },
    {
      id: '7',
      title: 'Om Namah Shivaya',
      artist: 'Traditional',
      category: 'Mantras',
      duration: '9:47',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/om-namah-shivaya.mp3',
    },
    {
      id: '8',
      title: 'Jai Ganesh Jai Ganesh Deva',
      artist: 'Traditional',
      category: 'Aartis',
      duration: '5:56',
      thumbnail: '🕉️',
      audioUrl: 'https://example.com/jai-ganesh.mp3',
    },
  ];

  const filteredKirtans = kirtans.filter(kirtan => {
    const matchesSearch = kirtan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kirtan.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || kirtan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const playKirtan = (kirtan) => {
    setCurrentKirtan(kirtan);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(parseInt(kirtan.duration.split(':')[0]) * 60 + parseInt(kirtan.duration.split(':')[1]));
    Alert.alert('Playing', `Now playing: ${kirtan.title}`);
  };

  const togglePlayPause = () => {
    if (currentKirtan) {
      setIsPlaying(!isPlaying);
    }
  };

  const skipToNext = () => {
    if (currentKirtan) {
      const currentIndex = kirtans.findIndex(k => k.id === currentKirtan.id);
      const nextIndex = (currentIndex + 1) % kirtans.length;
      playKirtan(kirtans[nextIndex]);
    }
  };

  const skipToPrevious = () => {
    if (currentKirtan) {
      const currentIndex = kirtans.findIndex(k => k.id === currentKirtan.id);
      const prevIndex = currentIndex === 0 ? kirtans.length - 1 : currentIndex - 1;
      playKirtan(kirtans[prevIndex]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderKirtanItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.kirtanItem}
      onPress={() => playKirtan(item)}
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

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.selectedCategoryText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

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
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
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
      <FlatList
        data={filteredKirtans}
        renderItem={renderKirtanItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.kirtansList}
        showsVerticalScrollIndicator={false}
      />

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
            </View>
          </View>
          
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={skipToPrevious}>
              <Ionicons name="play-skip-back" size={24} color={themeColors.accent} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={28} 
                color={themeColors.textPrimary} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={skipToNext}>
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