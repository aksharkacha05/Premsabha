import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';

const { width, height } = Dimensions.get('window');

const PdfViewerScreen = ({ navigation, route }) => {
  const { pdf } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(pdf.pages || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Demo content for when no PDF is available
  const demoContent = pdf.demoContent || `This is a demo view of ${pdf.title}.\n\nCategory: ${pdf.category}\nPages: ${pdf.pages}\nSize: ${pdf.size}\n\nIn the full version, you would see the actual PDF content here.`;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleShare = () => {
    Alert.alert('Share', `Sharing ${pdf.title}`, [{ text: 'OK' }]);
  };

  const handleBookmark = () => {
    Alert.alert('Bookmark', `Bookmarked ${pdf.title}`, [{ text: 'OK' }]);
  };

  const handleDownload = () => {
    Alert.alert('Download', `Downloading ${pdf.title}`, [{ text: 'OK' }]);
  };

  // If no PDF URL, show demo content
  if (!pdf.url) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>{pdf.title}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Text style={styles.actionButtonText}>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
              <Text style={styles.actionButtonText}>🔖</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
              <Text style={styles.actionButtonText}>⬇️</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.demoContainer}>
          <View style={styles.demoHeader}>
            <Text style={styles.demoTitle}>📖 Demo Mode</Text>
            <Text style={styles.demoSubtitle}>This is a preview of the PDF viewer</Text>
          </View>
          
          <ScrollView style={styles.demoContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.demoText}>{demoContent}</Text>
            
            <View style={styles.demoInfo}>
              <Text style={styles.demoInfoText}>📄 Pages: {pdf.pages}</Text>
              <Text style={styles.demoInfoText}>📁 Size: {pdf.size}</Text>
              <Text style={styles.demoInfoText}>📂 Category: {pdf.category}</Text>
            </View>
            
            <View style={styles.demoFeatures}>
              <Text style={styles.demoFeaturesTitle}>Features Available:</Text>
              <Text style={styles.demoFeaturesText}>• Page navigation</Text>
              <Text style={styles.demoFeaturesText}>• Search functionality</Text>
              <Text style={styles.demoFeaturesText}>• Bookmark pages</Text>
              <Text style={styles.demoFeaturesText}>• Share documents</Text>
              <Text style={styles.demoFeaturesText}>• Zoom in/out</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <View style={styles.pageInfo}>
            <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
          </View>
          <View style={styles.pageControls}>
            <TouchableOpacity 
              style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]} 
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButtonText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]} 
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const downloadPdf = () => {
    Alert.alert('Download', `Downloading ${pdf?.title} for offline reading...`);
  };

  const addToFavorites = () => {
    Alert.alert('Favorites', `${pdf?.title} added to favorites!`);
  };

  const sharePdf = () => {
    Alert.alert('Share', `Sharing ${pdf?.title}...`);
  };

  const getCurrentPageContent = () => {
    if (showSampleContent) {
      const pageContent = sampleContent.content.find(p => p.page === currentPage);
      return pageContent ? pageContent.text : 'Page content not available';
    }
    return 'PDF content would be displayed here in a real implementation.';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {pdf?.title || 'Sacred Text'}
          </Text>
          <Text style={styles.headerSubtitle}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={addToFavorites}>
            <Ionicons name="heart-outline" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={sharePdf}>
            <Ionicons name="share-outline" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* PDF Content Area */}
      <View style={styles.pdfContainer}>
        <ScrollView style={styles.pdfContent} showsVerticalScrollIndicator={false}>
          <View style={styles.pdfHeader}>
            <Text style={styles.pdfTitle}>{sampleContent.title}</Text>
            <Text style={styles.pdfPageInfo}>Page {currentPage}</Text>
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              {getCurrentPageContent()}
            </Text>
          </View>

          {showSampleContent && (
            <View style={styles.sampleInfo}>
              <Text style={styles.sampleInfoText}>
                📖 This is sample content for testing. In a real app, this would display the actual PDF.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Navigation Controls */}
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          style={[styles.navButton, currentPage <= 1 && styles.disabledButton]} 
          onPress={goToPreviousPage}
          disabled={currentPage <= 1}
        >
          <Ionicons name="chevron-back" size={24} color={currentPage <= 1 ? themeColors.textMuted : themeColors.accent} />
        </TouchableOpacity>

        <View style={styles.pageInfo}>
          <Text style={styles.pageText}>{currentPage}</Text>
          <Text style={styles.pageSeparator}>/</Text>
          <Text style={styles.pageText}>{totalPages}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.navButton, currentPage >= totalPages && styles.disabledButton]} 
          onPress={goToNextPage}
          disabled={currentPage >= totalPages}
        >
          <Ionicons name="chevron-forward" size={24} color={currentPage >= totalPages ? themeColors.textMuted : themeColors.accent} />
        </TouchableOpacity>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.actionButton} onPress={downloadPdf}>
          <Ionicons name="download-outline" size={20} color={themeColors.accent} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={addToFavorites}>
          <Ionicons name="heart-outline" size={20} color={themeColors.accent} />
          <Text style={styles.actionText}>Favorite</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="text-outline" size={20} color={themeColors.accent} />
          <Text style={styles.actionText}>Search</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={20} color={themeColors.accent} />
          <Text style={styles.actionText}>Bookmark</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
  },
  header: {
    backgroundColor: themeColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: themeColors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: themeColors.backgroundCard,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  pdfContent: {
    flex: 1,
  },
  pdfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.backgroundLight,
  },
  pdfTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
  },
  pdfPageInfo: {
    fontSize: 12,
    color: themeColors.textMuted,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: themeColors.textSecondary,
    lineHeight: 24,
    textAlign: 'justify',
  },
  sampleInfo: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: themeColors.backgroundLight,
    backgroundColor: themeColors.backgroundLight,
  },
  sampleInfoText: {
    fontSize: 14,
    color: themeColors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: themeColors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: themeColors.primaryDarker,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeColors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: themeColors.backgroundLight,
  },
  pageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
  },
  pageSeparator: {
    fontSize: 16,
    color: themeColors.textMuted,
    marginHorizontal: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: themeColors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: themeColors.primaryDarker,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: themeColors.accent,
    marginTop: 4,
    fontWeight: '500',
  },
  demoContainer: {
    flex: 1,
    backgroundColor: '#1a0a0a',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  demoHeader: {
    backgroundColor: '#8B0000',
    padding: 16,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  demoSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  demoContent: {
    flex: 1,
    padding: 16,
  },
  demoText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 20,
  },
  demoInfo: {
    backgroundColor: '#2a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  demoInfoText: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 8,
  },
  demoFeatures: {
    backgroundColor: '#2a1a1a',
    padding: 16,
    borderRadius: 8,
  },
  demoFeaturesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  demoFeaturesText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 6,
  },
});

export default PdfViewerScreen; 