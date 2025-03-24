import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const ImageUploadScreen = ({ route, navigation }) => {
  const { title, description } = route.params || { 
    title: 'Upload Image', 
    description: 'Upload a clear image' 
  };
  
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const handleUploadImage = () => {
    // This would normally connect to device camera/gallery
    // For demo purposes, we'll just set a placeholder image
    setUploadedImage({
      uri: 'https://www.carlogos.org/car-logos/suzuki-logo-2000x2000.png',
      type: 'image/jpeg',
      name: 'car_image.jpg',
      size: '256 KB'
    });
  };
  
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };
  
  const handleDone = () => {
    // Save uploaded image and go back
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
        
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Upload Instructions */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>{description}</Text>
        </View>
        
        {/* Upload Section */}
        {!uploadedImage ? (
          <TouchableOpacity 
            style={styles.uploadContainer}
            onPress={handleUploadImage}
          >
            <View style={styles.uploadIconContainer}>
              <Ionicons name="cloud-upload-outline" size={40} color="#FFD600" />
            </View>
            <Text style={styles.uploadText}>Tap to upload image</Text>
            <Text style={styles.uploadSubtext}>JPG, PNG or PDF (Max 5MB)</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: uploadedImage.uri }} 
              style={styles.previewImage} 
              resizeMode="contain"
            />
            <View style={styles.imageInfoContainer}>
              <View style={styles.imageInfo}>
                <Ionicons name="document-outline" size={24} color="#666666" style={styles.imageInfoIcon} />
                <View>
                  <Text style={styles.imageInfoTitle}>car_image.jpg</Text>
                  <Text style={styles.imageInfoSubtitle}>{uploadedImage.size}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleRemoveImage}
              >
                <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* Done Button */}
      {uploadedImage && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={handleDone}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  instructionContainer: {
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  uploadContainer: {
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#CCCCCC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    marginVertical: 20,
  },
  uploadIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#999999',
  },
  imagePreviewContainer: {
    marginVertical: 20,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
  },
  imageInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  imageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageInfoIcon: {
    marginRight: 10,
  },
  imageInfoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  imageInfoSubtitle: {
    fontSize: 14,
    color: '#999999',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  doneButton: {
    height: 55,
    borderRadius: 30,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default ImageUploadScreen; 