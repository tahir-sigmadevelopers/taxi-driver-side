import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const AddNewCarScreen = ({ navigation }) => {
  const [carData, setCarData] = useState({
    name: '',
    type: '',
    number: '',
    fuelType: '',
  });

  const handleAddDocumentDetails = () => {
    navigation.navigate('CarDocumentsScreen');
  };

  const handleAddCarImages = () => {
    // Navigate to add car images screen
    navigation.navigate('CarImagesScreen');
  };

  const handleAddNewCar = () => {
    // Add new car logic
    console.log('Add new car pressed with data:', carData);
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
        
        <Text style={styles.headerTitle}>Add New Car</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Car Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Ex. MAruti Suzuki Swift (vx!)"
            value={carData.name}
            onChangeText={(text) => setCarData({...carData, name: text})}
          />
        </View>
        
        {/* Car Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Type</Text>
          <TouchableOpacity style={styles.dropdownInput}>
            <Text style={carData.type ? styles.inputText : styles.placeholderText}>
              {carData.type || 'Select Type'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#FFD600" />
          </TouchableOpacity>
        </View>
        
        {/* Car Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Car Number"
            value={carData.number}
            onChangeText={(text) => setCarData({...carData, number: text})}
          />
        </View>
        
        {/* Car Fuel Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Fuel Type</Text>
          <TouchableOpacity style={styles.dropdownInput}>
            <Text style={carData.fuelType ? styles.inputText : styles.placeholderText}>
              {carData.fuelType || 'Select Fuel Type'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#FFD600" />
          </TouchableOpacity>
        </View>
        
        {/* Car Document Details */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Document Details</Text>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleAddDocumentDetails}
          >
            <Text style={styles.actionButtonText}>Add Document Details</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
          </TouchableOpacity>
        </View>
        
        {/* Car Images */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Images</Text>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleAddCarImages}
          >
            <Text style={styles.actionButtonText}>Add Car Images</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Add New Car Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddNewCar}
        >
          <Text style={styles.addButtonText}>Add New Car</Text>
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
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  textInput: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
  },
  dropdownInput: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#000000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999999',
  },
  actionButton: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#999999',
  },
  bottomButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addButton: {
    backgroundColor: '#FFD600',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddNewCarScreen; 