import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const PdfViewerScreen = ({ navigation, route }) => {
  const { pdf } = route.params || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(pdf?.pages || 100);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
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
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={sharePdf}>
            <Ionicons name="share-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PDF Content Area */}
      <View style={styles.pdfContainer}>
        <View style={styles.pdfPlaceholder}>
          <Text style={styles.pdfIcon}>📖</Text>
          <Text style={styles.pdfTitle}>{pdf?.title || 'Sacred Text'}</Text>
          <Text style={styles.pdfDescription}>
            {pdf?.description || 'Sacred discourses and teachings'}
          </Text>
          <Text style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </Text>
          
          {/* Sample Content */}
          <View style={styles.sampleContent}>
            <Text style={styles.contentText}>
              This is a sample page from the sacred text. In a real implementation, 
              this would display the actual PDF content with proper text rendering, 
              zoom capabilities, and navigation.
            </Text>
            <Text style={styles.contentText}>
              The PDF viewer would support:
            </Text>
            <Text style={styles.contentText}>• Text search and highlighting</Text>
            <Text style={styles.contentText}>• Zoom in/out functionality</Text>
            <Text style={styles.contentText}>• Bookmarking and annotations</Text>
            <Text style={styles.contentText}>• Night mode for comfortable reading</Text>
          </View>
        </View>
      </View>

      {/* Navigation Controls */}
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          style={[styles.navButton, currentPage <= 1 && styles.disabledButton]} 
          onPress={goToPreviousPage}
          disabled={currentPage <= 1}
        >
          <Ionicons name="chevron-back" size={24} color={currentPage <= 1 ? "#bdc3c7" : "#3498db"} />
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
          <Ionicons name="chevron-forward" size={24} color={currentPage >= totalPages ? "#bdc3c7" : "#3498db"} />
        </TouchableOpacity>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.actionButton} onPress={downloadPdf}>
          <Ionicons name="download-outline" size={20} color="#3498db" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={addToFavorites}>
          <Ionicons name="heart-outline" size={20} color="#3498db" />
          <Text style={styles.actionText}>Favorite</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="text-outline" size={20} color="#3498db" />
          <Text style={styles.actionText}>Search</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={20} color="#3498db" />
          <Text style={styles.actionText}>Bookmark</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#3498db',
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
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#e8f4fd',
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
    padding: 20,
  },
  pdfPlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minHeight: height * 0.6,
  },
  pdfIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  pdfTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  pdfDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 16,
  },
  pageInfo: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 24,
  },
  sampleContent: {
    width: '100%',
  },
  contentText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 12,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#f8f9fa',
  },
  pageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  pageSeparator: {
    fontSize: 16,
    color: '#7f8c8d',
    marginHorizontal: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#3498db',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default PdfViewerScreen; 