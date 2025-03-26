import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfilePictureScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Request permissions and pick image
  const handleDocumentUpload = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your photos to upload a profile picture.");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      // Get file info
      const uri = result.assets[0].uri;
      const fileNameMatch = uri.match(/[^\\/]+$/);
      const fileName = fileNameMatch ? fileNameMatch[0] : 'profile_image.jpg';
      
      // Get file size
      const fileInfo = await getFileInfo(uri);
      
      setImage({
        uri: uri,
        name: 'Profile Photo',
        type: getFileType(uri),
        size: formatFileSize(fileInfo.size)
      });
    }
  };

  // Take a picture with camera
  const handleTakePhoto = async () => {
    // Request camera permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your camera to take a profile photo.");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      // Get file info
      const uri = result.assets[0].uri;
      
      // Get file size
      const fileInfo = await getFileInfo(uri);
      
      setImage({
        uri: uri,
        name: 'Profile Photo',
        type: getFileType(uri),
        size: formatFileSize(fileInfo.size)
      });
    }
  };

  // Get file information (size)
  const getFileInfo = async (uri) => {
    if (Platform.OS === 'web') {
      return { size: 0 }; // Web doesn't provide file size
    }
    
    try {
      const fileInfo = await fetch(uri).then(response => {
        return {
          size: response.headers.get('Content-Length') || 0
        };
      });
      return fileInfo;
    } catch (error) {
      console.error('Error getting file info:', error);
      return { size: 0 };
    }
  };

  // Get file extension from URI
  const getFileType = (uri) => {
    const extension = uri.split('.').pop().toUpperCase();
    return extension || 'JPG';
  };

  // Format file size for display
  const formatFileSize = (size) => {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleContinue = async () => {
    if (!image) {
      Alert.alert('Missing Photo', 'Please upload a profile photo first');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call for uploading the image
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would upload the image to a server
      // Example:
      // const formData = new FormData();
      // formData.append('profileImage', {
      //   uri: image.uri,
      //   name: 'profile.jpg',
      //   type: 'image/jpeg'
      // });
      // await fetch('https://your-api.com/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Navigate back to Welcome screen
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to upload profile picture. Please try again.');
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
        <Text style={styles.headerTitle}>Profile Picture</Text>
        <View style={styles.placeholderButton} />
      </View>

      <View style={styles.content}>
        {/* Guidance bullets */}
        <View style={styles.bulletPoints}>
          <View style={styles.bulletItem}>
            <View style={styles.bulletIcon}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.bulletText}>Please Upload a Clear Selfie</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bulletIcon}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.bulletText}>The Selfie Should have the applicants face alone</Text>
          </View>
          
          <View style={styles.bulletItem}>
            <View style={styles.bulletIcon}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.bulletText}>Upload JPEG / PNG format image</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Attach Picture</Text>

        {!image ? (
          <View>
            <TouchableOpacity 
              style={styles.uploadContainer}
              onPress={handleDocumentUpload}
            >
              <View style={styles.uploadIconContainer}>
                <Ionicons name="image-outline" size={40} color="#888" />
                <Ionicons name="arrow-up" size={20} color="#888" style={styles.uploadArrow} />
              </View>
              <Text style={styles.uploadText}>Choose from gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={handleTakePhoto}
            >
              <Ionicons name="camera-outline" size={24} color="#000" />
              <Text style={styles.cameraButtonText}>Take a photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.documentContainer}>
              <Image 
                source={{ uri: image.uri }} 
                style={styles.documentImage}
                resizeMode="cover" 
              />
              <TouchableOpacity 
                style={styles.removeDocumentButton}
                onPress={handleRemoveImage}
              >
                <Ionicons name="close" size={16} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{image.name}</Text>
              <Text style={styles.documentType}>{image.type} • {image.size}</Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !image && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!image || loading}
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
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
  cameraButton: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  cameraButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  documentContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  documentImage: {
    width: '100%',
    height: 300,
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
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#FFD600',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default ProfilePictureScreen; 