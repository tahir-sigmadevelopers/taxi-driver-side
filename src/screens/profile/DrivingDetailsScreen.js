import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';

const DrivingDetailsScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    driverLicense: '',
    licenseExpiry: '',
  });
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleTakePhoto = async () => {
    // Request camera permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your camera to take a photo of your license.");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 3]
    });

    if (!result.canceled) {
      // Get file info
      const uri = result.assets[0].uri;
      
      // Get file size
      const fileInfo = await getFileInfo(uri);
      
      setLicensePhoto({
        uri: uri,
        name: 'Drivers License',
        type: getFileType(uri),
        size: formatFileSize(fileInfo.size)
      });
    }
  };

  const handleUploadPhoto = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow access to your photos to upload your license photo.");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 3]
    });

    if (!result.canceled) {
      // Get file info
      const uri = result.assets[0].uri;
      const fileNameMatch = uri.match(/[^\\/]+$/);
      const fileName = fileNameMatch ? fileNameMatch[0] : 'license_photo.jpg';
      
      // Get file size
      const fileInfo = await getFileInfo(uri);
      
      setLicensePhoto({
        uri: uri,
        name: 'Drivers License',
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

  const isFormValid = () => {
    return (
      formData.vehicleMake.trim() !== '' &&
      formData.vehicleModel.trim() !== '' &&
      formData.vehicleYear.trim() !== '' &&
      formData.licensePlate.trim() !== '' &&
      formData.driverLicense.trim() !== '' &&
      formData.licenseExpiry.trim() !== '' &&
      licensePhoto !== null
    );
  };

  const handleSave = async () => {
    if (!isFormValid()) {
      Alert.alert('Missing Information', 'Please fill in all fields and upload your license photo');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would upload the form data and photo
      // Example:
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => {
      //   formDataToSend.append(key, formData[key]);
      // });
      // formDataToSend.append('licensePhoto', {
      //   uri: licensePhoto.uri,
      //   name: 'license_photo.jpg',
      //   type: 'image/jpeg'
      // });
      // await fetch('https://your-api.com/upload-driving-details', {
      //   method: 'POST',
      //   body: formDataToSend
      // });
      
      // Navigate back to Welcome screen
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save driving details. Please try again.');
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
        <Text style={styles.headerTitle}>Driving Details</Text>
        <View style={styles.placeholderButton} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Vehicle Make</Text>
          <TextInput
            style={styles.input}
            value={formData.vehicleMake}
            onChangeText={(value) => handleInputChange('vehicleMake', value)}
            placeholder="e.g. Toyota"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Vehicle Model</Text>
          <TextInput
            style={styles.input}
            value={formData.vehicleModel}
            onChangeText={(value) => handleInputChange('vehicleModel', value)}
            placeholder="e.g. Camry"
          />
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Vehicle Year</Text>
            <TextInput
              style={styles.input}
              value={formData.vehicleYear}
              onChangeText={(value) => handleInputChange('vehicleYear', value)}
              placeholder="e.g. 2020"
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          
          <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>License Plate</Text>
            <TextInput
              style={styles.input}
              value={formData.licensePlate}
              onChangeText={(value) => handleInputChange('licensePlate', value)}
              placeholder="e.g. ABC123"
              autoCapitalize="characters"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Driver's License Information</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Driver's License Number</Text>
          <TextInput
            style={styles.input}
            value={formData.driverLicense}
            onChangeText={(value) => handleInputChange('driverLicense', value)}
            placeholder="Enter license number"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>License Expiry Date</Text>
          <TextInput
            style={styles.input}
            value={formData.licenseExpiry}
            onChangeText={(value) => handleInputChange('licenseExpiry', value)}
            placeholder="MM/DD/YYYY"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>License Photo</Text>
          
          {licensePhoto ? (
            <View style={styles.photoPreview}>
              <Image 
                source={{ uri: licensePhoto.uri }} 
                style={styles.licenseImage} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removePhotoButton}
                onPress={() => setLicensePhoto(null)}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
              
              <View style={styles.photoInfo}>
                <Text style={styles.photoInfoName}>{licensePhoto.name}</Text>
                <Text style={styles.photoInfoDetails}>{licensePhoto.type} • {licensePhoto.size}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.photoActions}>
              <TouchableOpacity 
                style={styles.photoButton} 
                onPress={handleTakePhoto}
              >
                <Ionicons name="camera-outline" size={24} color="#000" />
                <Text style={styles.photoButtonText}>Take Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.photoButton} 
                onPress={handleUploadPhoto}
              >
                <Ionicons name="cloud-upload-outline" size={24} color="#000" />
                <Text style={styles.photoButtonText}>Upload Photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.noteContainer}>
          <Ionicons name="information-circle-outline" size={20} color="#666" />
          <Text style={styles.noteText}>
            Please ensure all information is accurate and matches your official documents.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.saveButton, !isFormValid() && styles.disabledButton]}
        onPress={handleSave}
        disabled={!isFormValid() || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.saveButtonText}>Save</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    color: '#000',
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5,
  },
  photoButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  photoPreview: {
    position: 'relative',
    marginBottom: 10,
  },
  licenseImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  photoInfo: {
    marginTop: 8,
  },
  photoInfoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  photoInfoDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
  },
  noteText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#FFD600',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default DrivingDetailsScreen; 