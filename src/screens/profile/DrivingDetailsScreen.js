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
  Image
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

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

  const handleTakePhoto = () => {
    // In a real app, this would use the camera API
    console.log('Take photo pressed');
  };

  const handleUploadPhoto = () => {
    // In a real app, this would use the image picker API
    console.log('Upload photo pressed');
    // For demo purposes
    setLicensePhoto('https://example.com/license_photo.jpg');
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
      alert('Please fill in all fields and upload your license photo');
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
                source={{ uri: licensePhoto }} 
                style={styles.licenseImage} 
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.removePhotoButton}
                onPress={() => setLicensePhoto(null)}
              >
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 5,
  },
  photoButtonText: {
    color: '#000',
    marginTop: 8,
    fontSize: 14,
  },
  photoPreview: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: 10,
  },
  licenseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    margin: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#F5F5F5',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DrivingDetailsScreen; 