import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors, commonStyles } from '../config/theme';
// import * as WebBrowser from 'expo-web-browser';

const { width, height } = Dimensions.get('window');

const PdfViewerScreen = ({ route, navigation }) => {
  const { pdf } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(pdf.pages || 10);
  const [isLoading, setIsLoading] = useState(false);

  // Check if we have a valid PDF URL
  const pdfUrl = pdf?.url || pdf?.downloadUrl;
  const isDemo = !pdfUrl || !pdfUrl.toLowerCase().endsWith('.pdf');

  // Demo content for when no real PDF is available
  const demoContent = pdf?.demoContent || `This is a demo view of ${pdf?.title || 'PDF Document'}.

Category: ${pdf?.category || 'General'}
Pages: ${pdf?.pages || 'Unknown'}
Size: ${pdf?.size || 'Unknown'}

In the full version, you would see the actual PDF content here. This demo shows how the PDF viewer would work with real content.

Features available with real PDFs:
• Full PDF rendering
• Page navigation
• Zoom in/out
• Search within document
• Bookmark pages
• Download for offline reading
• Share PDF content

To enable real PDF viewing:
1. Add PDF files to your backend API
2. Update the API endpoints to serve PDF files
3. Ensure PDF URLs are accessible`;

  const openPdfInBrowser = async () => {
    if (!pdfUrl) {
      Alert.alert('No PDF URL', 'This PDF is not available for external viewing.');
      return;
    }

    try {
      setIsLoading(true);
      await WebBrowser.openBrowserAsync(pdfUrl);
    } catch (error) {
      Alert.alert('Error', 'Could not open PDF in browser. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) {
      Alert.alert('Demo Mode', 'Download feature requires real PDF files.');
      return;
    }
    Alert.alert('Download', `Downloading ${pdf.title}...`);
  };

  const sharePdf = () => {
    if (!pdfUrl) {
      Alert.alert('Demo Mode', 'Share feature requires real PDF files.');
      return;
    }
    Alert.alert('Share', `Sharing ${pdf.title}...`);
  };

  const bookmarkPage = () => {
    Alert.alert('Bookmark', `Page ${currentPage} bookmarked!`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderDemoContent = () => (
    <ScrollView style={styles.demoContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.demoHeader}>
        <Text style={styles.demoTitle}>{pdf?.title || 'PDF Document'}</Text>
        <Text style={styles.demoSubtitle}>Demo Mode - Page {currentPage} of {totalPages}</Text>
      </View>
      
      <View style={styles.demoContent}>
        <Text style={styles.demoText}>{demoContent}</Text>
        
        {/* Demo features list */}
        <View style={styles.featuresList}>
          <Text style={styles.featuresTitle}>Available Features:</Text>
          {[
            'Full PDF rendering with zoom',
            'Page navigation controls',
            'Search within document',
            'Bookmark pages',
            'Download for offline reading',
            'Share PDF content',
            'Dark/Light theme support'
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color={themeColors.accent} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

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
        
        <View style={styles.headerTitle}>
          <Text style={styles.title} numberOfLines={1}>
            {pdf?.title || 'PDF Viewer'}
          </Text>
          <Text style={styles.subtitle}>
            {isDemo ? 'Demo Mode' : 'PDF Document'}
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={bookmarkPage}>
            <Ionicons name="bookmark-outline" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={sharePdf}>
            <Ionicons name="share-outline" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {isDemo ? renderDemoContent() : (
        <View style={styles.pdfContainer}>
          <Text style={styles.pdfMessage}>
            PDF URL: {pdfUrl}
          </Text>
          <TouchableOpacity 
            style={styles.openButton} 
            onPress={openPdfInBrowser}
            disabled={isLoading}
          >
            <Ionicons 
              name={isLoading ? "hourglass-outline" : "open-outline"} 
              size={20} 
              color={themeColors.textPrimary} 
            />
            <Text style={styles.openButtonText}>
              {isLoading ? 'Opening...' : 'Open in Browser'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer Controls */}
      <View style={styles.footer}>
        <View style={styles.pageInfo}>
          <Text style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, currentPage <= 1 && styles.disabledButton]} 
            onPress={previousPage}
            disabled={currentPage <= 1}
          >
            <Ionicons name="chevron-back" size={24} color={themeColors.textPrimary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, currentPage >= totalPages && styles.disabledButton]} 
            onPress={nextPage}
            disabled={currentPage >= totalPages}
          >
            <Ionicons name="chevron-forward" size={24} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.downloadButton} onPress={downloadPdf}>
          <Ionicons name="download-outline" size={20} color={themeColors.textPrimary} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: themeColors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryDarker,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: themeColors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  demoContainer: {
    flex: 1,
    backgroundColor: themeColors.backgroundCard,
  },
  demoHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryDarker,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 8,
  },
  demoSubtitle: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
  demoContent: {
    padding: 20,
  },
  demoText: {
    fontSize: 16,
    lineHeight: 24,
    color: themeColors.textPrimary,
    marginBottom: 24,
  },
  featuresList: {
    backgroundColor: themeColors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: themeColors.textSecondary,
    marginLeft: 8,
  },
  pdfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: themeColors.backgroundCard,
  },
  pdfMessage: {
    fontSize: 16,
    color: themeColors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: themeColors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: themeColors.primaryDarker,
  },
  pageInfo: {
    flex: 1,
  },
  pageText: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  downloadButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default PdfViewerScreen; 