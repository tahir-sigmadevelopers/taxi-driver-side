import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const CarPUCScreen = ({ navigation }) => {
  const [uploadedDocument, setUploadedDocument] = useState({
    name: 'PUC',
    type: 'PNG',
    size: '400 kb',
    uri: 'https://i.ibb.co/rsMxqZf/cheque.png', // Example image URL
  });

  const handleUpload = () => {
    // Handle document upload logic
    console.log('Upload document pressed');
  };

  const handleDeleteDocument = () => {
    // Handle document deletion
    setUploadedDocument(null);
  };

  const handleDone = () => {
    // Save and go back
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Car PUC</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Steps */}
        <View style={styles.stepsContainer}>
          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.stepText}>Upload Valid PUC Slip</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.stepText}>Upload PDF / JPEG / PNG</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Upload Section */}
        <Text style={styles.sectionTitle}>Attach PUC Details</Text>
        
        <TouchableOpacity 
          style={styles.uploadContainer}
          onPress={handleUpload}
        >
          <View style={styles.uploadContent}>
            <View style={styles.uploadIconContainer}>
              <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.uploadText}>Upload Documents</Text>
          </View>
        </TouchableOpacity>
        
        {/* Uploaded Document */}
        {uploadedDocument && (
          <View style={styles.documentContainer}>
            <View style={styles.documentPreview}>
              <Image 
                source={{ uri: uploadedDocument.uri }}
                style={styles.documentImage}
              />
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDeleteDocument}
              >
                <Ionicons name="close" size={18} color="#000000" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{uploadedDocument.name}</Text>
              <Text style={styles.documentMeta}>
                {uploadedDocument.type} • {uploadedDocument.size}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* Done Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // To offset the backButton width for centering
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepText: {
    fontSize: 16,
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  uploadContainer: {
    height: 200,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#808080',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 16,
    color: '#808080',
  },
  documentContainer: {
    marginBottom: 20,
  },
  documentPreview: {
    position: 'relative',
    marginBottom: 10,
  },
  documentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  documentInfo: {
    marginTop: 5,
  },
  documentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  documentMeta: {
    fontSize: 14,
    color: '#808080',
  },
  bottomButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  doneButton: {
    backgroundColor: '#FFD600',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CarPUCScreen; 