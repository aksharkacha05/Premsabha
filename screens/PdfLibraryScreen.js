import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';
import { contentApi } from '../config/api';

const { width } = Dimensions.get('window');

const PdfLibraryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pdfs, setPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'All', name: 'All Texts', icon: '📚' },
    { id: 'Vachanamrut', name: 'Vachanamrut', icon: '📖' },
    { id: 'SwaminiVato', name: 'Swamini Vato', icon: '📜' },
    { id: 'Shikshapatri', name: 'Shikshapatri', icon: '📋' },
    { id: 'Aarti', name: 'Aarti', icon: '🕉️' },
    { id: 'Stotra', name: 'Stotra', icon: '🙏' },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await contentApi.getAllContent();
        if (result.success && Array.isArray(result.data.books)) {
          setPdfs(result.data.books);
        } else {
          // Fallback to demo data if API fails
          setPdfs(getDemoPdfs());
        }
      } catch (err) {
        // Fallback to demo data if API fails
        setPdfs(getDemoPdfs());
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Demo PDF data fallback
  const getDemoPdfs = () => [
    {
      id: '1',
      title: 'Vachanamrut - Gadhada I',
      description: 'Sacred discourses of Lord Swaminarayan from Gadhada',
      category: 'Vachanamrut',
      pages: 150,
      size: '2.5 MB',
      icon: '📖',
    },
    {
      id: '2',
      title: 'Swamini Vato - Chapter 1',
      description: 'Divine conversations and teachings',
      category: 'SwaminiVato',
      pages: 85,
      size: '1.8 MB',
      icon: '📜',
    },
    {
      id: '3',
      title: 'Shikshapatri - Complete',
      description: 'The sacred code of conduct by Lord Swaminarayan',
      category: 'Shikshapatri',
      pages: 212,
      size: '3.2 MB',
      icon: '📋',
    },
    {
      id: '4',
      title: 'Aarti Kunj Bihari Ki',
      description: 'Traditional aarti for Lord Krishna',
      category: 'Aarti',
      pages: 12,
      size: '500 KB',
      icon: '🕉️',
    },
    {
      id: '5',
      title: 'Shree Krishna Stotra',
      description: 'Devotional hymns in praise of Lord Krishna',
      category: 'Stotra',
      pages: 45,
      size: '1.1 MB',
      icon: '🙏',
    },
  ];

  const filteredPdfs = pdfs.filter(pdf => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && (selectedCategory === 'All' || (pdf.category && pdf.category === selectedCategory));
  });

  const downloadPdf = (pdf) => {
    // TODO: Download PDF for offline reading
    Alert.alert('Download', `Downloading ${pdf.title}...`);
  };

  const addToFavorites = (pdf) => {
    // TODO: Add to favorites
    Alert.alert('Favorites', `${pdf.title} added to favorites!`);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPdfItem = ({ item }) => (
    <View style={styles.pdfCard}>
      <View style={styles.pdfIcon}>
        <Ionicons name="document-text-outline" size={24} color={themeColors.primary} />
      </View>
      <View style={styles.pdfContent}>
        <Text style={styles.pdfTitle}>{item.title}</Text>
        <Text style={styles.pdfDescription}>{item.description || ''}</Text>
        <View style={styles.pdfMeta}>
          {item.size && <Text style={styles.pdfMetaText}>{item.size}</Text>}
          {item.pages && <Text style={styles.pdfMetaText}>• {item.pages} pages</Text>}
        </View>
      </View>
      <View style={styles.pdfActions}>
        {(item.downloadUrl || item.url) && (
          <TouchableOpacity style={styles.openButton} onPress={() => Linking.openURL(item.downloadUrl || item.url)}>
            <Text style={styles.openButtonText}>Open in Website</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={commonStyles.headingLarge}>Sacred Library</Text>
        <Text style={styles.headerSubtitle}>Discover divine wisdom</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={themeColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sacred texts..."
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
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* PDFs List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading sacred texts...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPdfs}
          renderItem={renderPdfItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.pdfsList}
          showsVerticalScrollIndicator={false}
        />
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
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: themeColors.primary,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.textPrimary,
  },
  selectedCategoryText: {
    color: themeColors.textPrimary,
  },
  pdfsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  pdfCard: {
    backgroundColor: themeColors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pdfIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pdfContent: {
    flex: 1,
  },
  pdfTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  pdfDescription: {
    fontSize: 14,
    color: themeColors.textSecondary,
    marginBottom: 8,
  },
  pdfMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfMetaText: {
    fontSize: 12,
    color: themeColors.textMuted,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: themeColors.textSecondary,
  },
  pdfActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  openButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  openButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.textPrimary,
  },
});

export default PdfLibraryScreen; 