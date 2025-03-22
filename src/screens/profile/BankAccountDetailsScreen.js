import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const BankAccountDetailsScreen = ({ navigation }) => {
  const [document, setDocument] = useState({
    uri: 'https://example.com/bank_cheque.png',
    name: 'Bank Cheque',
    type: 'PNG',
    size: '400 kb'
  });
  const [loading, setLoading] = useState(false);

  const handleDocumentUpload = () => {
    // In a real app, this would use the document picker API
    console.log('Document upload pressed');
    // Mock implementation already set the document in state
  };

  const handleRemoveDocument = () => {
    setDocument(null);
  };

  const handleContinue = async () => {
    if (!document) {
      // In a real app, we'd show a proper error message
      alert('Please upload a bank document first');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back to Welcome screen
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Account Details</Text>
        <View style={styles.placeholderButton} />
      </View>

      <ScrollView style={styles.content}>
        {/* Guidance bullets */}
        <View style={styles.bulletPoints}>
          <View style={styles.bulletItem}>
            <View style={styles.bulletIcon}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.bulletText}>Upload Bank Document (Passbook, Cancelled Cheque, Bank Statement, or digital Account Screenshot)</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bulletIcon}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.bulletText}>Upload PDF / JPEG / PNG</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Attach Bank Account Details</Text>

        {!document ? (
          <TouchableOpacity 
            style={styles.uploadContainer}
            onPress={handleDocumentUpload}
          >
            <View style={styles.uploadIconContainer}>
              <Ionicons name="document-outline" size={40} color="#888" />
              <Ionicons name="arrow-up" size={20} color="#888" style={styles.uploadArrow} />
            </View>
            <Text style={styles.uploadText}>Upload Documents</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <View style={styles.documentContainer}>
              <Image 
                source={{ uri: document.uri }} 
                style={styles.documentImage} 
              />
              <TouchableOpacity 
                style={styles.removeDocumentButton}
                onPress={handleRemoveDocument}
              >
                <Ionicons name="close" size={16} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{document.name}</Text>
              <Text style={styles.documentType}>{document.type} • {document.size}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.continueButton, !document && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!document || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholderButton: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bulletPoints: {
    marginVertical: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bulletIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bulletText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadIconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  uploadArrow: {
    position: 'absolute',
    top: 10,
    right: -5,
  },
  uploadText: {
    fontSize: 16,
    color: '#888',
  },
  documentContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  documentImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeDocumentButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFD600',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentInfo: {
    marginBottom: 30,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  documentType: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    margin: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#F5F5F5',
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BankAccountDetailsScreen; 