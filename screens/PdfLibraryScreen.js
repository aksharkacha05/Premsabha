import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';

const { width } = Dimensions.get('window');

const PdfLibraryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All Texts', icon: '📚' },
    { id: 'Vachanamrut', name: 'Vachanamrut', icon: '📖' },
    { id: 'SwaminiVato', name: 'Swamini Vato', icon: '📜' },
    { id: 'Shikshapatri', name: 'Shikshapatri', icon: '📋' },
    { id: 'Aarti', name: 'Aarti', icon: '🕉️' },
    { id: 'Stotra', name: 'Stotra', icon: '🙏' },
  ];

  const pdfs = [
    {
      id: 1,
      title: 'Vachanamrut - Gadhada I',
      category: 'Vachanamrut',
      description: 'Sacred discourses of Lord Swaminarayan',
      url: { uri: 'bundle-assets://swadhyay/ChaitanayDhodh.pdf' },
      icon: '📖',
      size: '2.5 MB',
      pages: 150,
    },
    {
      id: 2,
      title: 'Vachanamrut - Gadhada II',
      category: 'Vachanamrut',
      description: 'Sacred discourses of Lord Swaminarayan',
      url: null,
      icon: '📖',
      size: '3.1 MB',
      pages: 180,
    },
    {
      id: 3,
      title: 'Vachanamrut - Gadhada III',
      category: 'Vachanamrut',
      description: 'Sacred discourses of Lord Swaminarayan',
      url: null,
      icon: '📖',
      size: '2.8 MB',
      pages: 165,
    },
    {
      id: 4,
      title: 'Swamini Vato - Part 1',
      category: 'SwaminiVato',
      description: 'Sacred discourses of Gunatitanand Swami',
      url: null,
      icon: '📜',
      size: '1.9 MB',
      pages: 120,
    },
    {
      id: 5,
      title: 'Swamini Vato - Part 2',
      category: 'SwaminiVato',
      description: 'Sacred discourses of Gunatitanand Swami',
      url: null,
      icon: '📜',
      size: '2.2 MB',
      pages: 140,
    },
    {
      id: 6,
      title: 'Shikshapatri',
      category: 'Shikshapatri',
      description: 'Code of conduct by Lord Swaminarayan',
      url: null,
      icon: '📋',
      size: '1.5 MB',
      pages: 85,
    },
    {
      id: 7,
      title: 'Jai Swaminarayan Aarti',
      category: 'Aarti',
      description: 'Devotional aarti for Lord Swaminarayan',
      url: null,
      icon: '🕉️',
      size: '0.8 MB',
      pages: 25,
    },
    {
      id: 8,
      title: 'Gunatitanand Swami Aarti',
      category: 'Aarti',
      description: 'Devotional aarti for Gunatitanand Swami',
      url: null,
      icon: '🕉️',
      size: '0.9 MB',
      pages: 30,
    },
    {
      id: 9,
      title: 'Shree Hari Stuti',
      category: 'Stotra',
      description: 'Devotional hymns in praise of Lord Hari',
      url: null,
      icon: '🙏',
      size: '1.2 MB',
      pages: 45,
    },
  ];

  const filteredPdfs = pdfs.filter(pdf => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pdf.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pdf.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openPdf = (pdf) => {
    // Check if PDF file is available
    if (!pdf.url) {
      Alert.alert(
        'Demo Mode',
        `Opening: ${pdf.title}\n\nThis is a demo. Add real PDF files to enable full viewing.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'View Demo', 
            onPress: () => {
              navigation.navigate('PdfViewer', { 
                pdf: {
                  ...pdf,
                  url: null,
                  demoContent: `This is a demo view of ${pdf.title}.\n\nCategory: ${pdf.category}\nPages: ${pdf.pages}\nSize: ${pdf.size}\n\nIn the full version, you would see the actual PDF content here.`
                } 
              });
            }
          }
        ]
      );
      return;
    }

    navigation.navigate('PdfViewer', { pdf });
  };

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
        <Text style={styles.pdfIconText}>{item.icon}</Text>
      </View>
      
      <View style={styles.pdfContent}>
        <Text style={styles.pdfTitle}>{item.title}</Text>
        <Text style={styles.pdfDescription}>{item.description}</Text>
        <View style={styles.pdfMeta}>
          <Text style={styles.pdfMetaText}>{item.size}</Text>
          <Text style={styles.pdfMetaText}>•</Text>
          <Text style={styles.pdfMetaText}>{item.pages} pages</Text>
        </View>
      </View>
      
      <View style={styles.pdfActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => addToFavorites(item)}
        >
          <Ionicons name="heart-outline" size={20} color="#3498db" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => downloadPdf(item)}
        >
          <Ionicons name="download-outline" size={20} color="#3498db" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.openButton} 
          onPress={() => openPdf(item)}
        >
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>
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
      <FlatList
        data={filteredPdfs}
        renderItem={renderPdfItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.pdfsList}
        showsVerticalScrollIndicator={false}
      />
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
  pdfIconText: {
    fontSize: 20,
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
  pdfActions: {
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  openButton: {
    backgroundColor: themeColors.accent,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  openButtonText: {
    color: themeColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PdfLibraryScreen; 