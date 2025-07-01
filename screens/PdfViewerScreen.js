import React from 'react';
import { View, Text } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewerScreen = ({ route }) => {
  const { pdf } = route.params;
  console.log('PDF source:', pdf.url);

  if (!pdf.url) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No PDF file found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={pdf.url}
        style={{ flex: 1, width: '100%' }}
        onError={error => console.log('PDF error:', error)}
      />
    </View>
  );
};

export default PdfViewerScreen; 