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
  Platform,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

// Car type options
const CAR_TYPES = [
  { id: 'sedan', label: 'Sedan' },
  { id: 'suv', label: 'SUV' },
  { id: 'hatchback', label: 'Hatchback' },
  { id: 'minivan', label: 'Minivan' },
  { id: 'crossover', label: 'Crossover' },
  { id: 'convertible', label: 'Convertible' },
  { id: 'coupe', label: 'Coupe' },
  { id: 'wagon', label: 'Wagon' },
];

// Fuel type options
const FUEL_TYPES = [
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'electric', label: 'Electric' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'cng', label: 'CNG' },
  { id: 'lpg', label: 'LPG' },
];

// Car tag options
const CAR_TAGS = [
  { id: 'air_conditioning', label: 'Air Conditioning' },
  { id: 'power_steering', label: 'Power Steering' },
  { id: 'airbags', label: 'Airbags' },
  { id: 'sunroof', label: 'Sunroof' },
  { id: 'bluetooth', label: 'Bluetooth' },
  { id: 'backup_camera', label: 'Backup Camera' },
  { id: 'navigation_system', label: 'Navigation System' },
  { id: 'leather_seats', label: 'Leather Seats' },
  { id: 'heated_seats', label: 'Heated Seats' },
  { id: 'keyless_entry', label: 'Keyless Entry' },
  { id: 'cruise_control', label: 'Cruise Control' },
  { id: 'alloy_wheels', label: 'Alloy Wheels' },
  { id: 'parking_sensors', label: 'Parking Sensors' },
  { id: 'auto_climate', label: 'Auto Climate Control' },
  { id: 'premium_audio', label: 'Premium Audio' },
];

const AddNewCarScreen = ({ navigation }) => {
  const [carData, setCarData] = useState({
    name: '',
    type: '',
    number: '',
    fuelType: '',
    tags: [],
  });

  // Modal visibility states
  const [isCarTypeModalVisible, setCarTypeModalVisible] = useState(false);
  const [isFuelTypeModalVisible, setFuelTypeModalVisible] = useState(false);
  const [isTagsModalVisible, setTagsModalVisible] = useState(false);

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

  // Handle car type selection
  const handleSelectCarType = (item) => {
    setCarData({...carData, type: item.label});
    setCarTypeModalVisible(false);
  };

  // Handle fuel type selection
  const handleSelectFuelType = (item) => {
    setCarData({...carData, fuelType: item.label});
    setFuelTypeModalVisible(false);
  };

  // Handle tag selection (toggle)
  const handleToggleTag = (item) => {
    const currentTags = [...carData.tags];
    const tagIndex = currentTags.findIndex(tag => tag.id === item.id);
    
    if (tagIndex >= 0) {
      // Tag already selected, remove it
      currentTags.splice(tagIndex, 1);
    } else {
      // Tag not selected, add it
      currentTags.push(item);
    }
    
    setCarData({...carData, tags: currentTags});
  };

  // Remove a tag
  const handleRemoveTag = (tagId) => {
    const updatedTags = carData.tags.filter(tag => tag.id !== tagId);
    setCarData({...carData, tags: updatedTags});
  };

  // Check if a tag is selected
  const isTagSelected = (tagId) => {
    return carData.tags.some(tag => tag.id === tagId);
  };

  // Generic modal component for selection
  const SelectionModal = ({ visible, onClose, data, onSelect, title, multiSelect = false }) => (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionItem, 
                  multiSelect && isTagSelected(item.id) && styles.selectedOption
                ]}
                onPress={() => multiSelect ? handleToggleTag(item) : onSelect(item)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    multiSelect && isTagSelected(item.id) && styles.selectedOptionText
                  ]}
                >
                  {item.label}
                </Text>
                {multiSelect && isTagSelected(item.id) && (
                  <Ionicons name="checkmark" size={20} color="#FFD600" />
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No options available</Text>
              </View>
            )}
          />
          
          {multiSelect && (
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={onClose}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );

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
            placeholder="Ex. Maruti Suzuki Swift (VXI)"
            value={carData.name}
            onChangeText={(text) => setCarData({...carData, name: text})}
          />
        </View>
        
        {/* Car Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Type</Text>
          <TouchableOpacity 
            style={styles.dropdownInput}
            onPress={() => setCarTypeModalVisible(true)}
          >
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
            autoCapitalize="characters"
          />
        </View>
        
        {/* Car Fuel Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Fuel Type</Text>
          <TouchableOpacity 
            style={styles.dropdownInput}
            onPress={() => setFuelTypeModalVisible(true)}
          >
            <Text style={carData.fuelType ? styles.inputText : styles.placeholderText}>
              {carData.fuelType || 'Select Fuel Type'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#FFD600" />
          </TouchableOpacity>
        </View>
        
        {/* Car Tags */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Car Features (Select multiple)</Text>
          <TouchableOpacity 
            style={styles.dropdownInput}
            onPress={() => setTagsModalVisible(true)}
          >
            <Text style={carData.tags.length > 0 ? styles.inputText : styles.placeholderText}>
              {carData.tags.length > 0 ? `${carData.tags.length} features selected` : 'Select Features'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#FFD600" />
          </TouchableOpacity>
          
          {/* Display selected tags */}
          {carData.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {carData.tags.map(tag => (
                <View key={tag.id} style={styles.tagItem}>
                  <Text style={styles.tagText}>{tag.label}</Text>
                  <TouchableOpacity 
                    style={styles.tagRemoveButton}
                    onPress={() => handleRemoveTag(tag.id)}
                  >
                    <Ionicons name="close-circle" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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

      {/* Car Type Selection Modal */}
      <SelectionModal 
        visible={isCarTypeModalVisible}
        onClose={() => setCarTypeModalVisible(false)}
        data={CAR_TYPES}
        onSelect={handleSelectCarType}
        title="Select Car Type"
      />

      {/* Fuel Type Selection Modal */}
      <SelectionModal 
        visible={isFuelTypeModalVisible}
        onClose={() => setFuelTypeModalVisible(false)}
        data={FUEL_TYPES}
        onSelect={handleSelectFuelType}
        title="Select Fuel Type"
      />

      {/* Car Tags Selection Modal */}
      <SelectionModal 
        visible={isTagsModalVisible}
        onClose={() => setTagsModalVisible(false)}
        data={CAR_TAGS}
        onSelect={() => {}}
        title="Select Car Features"
        multiSelect={true}
      />
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  optionItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 214, 0, 0.1)',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedOptionText: {
    fontWeight: '500',
    color: '#000000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
  doneButton: {
    backgroundColor: '#FFD600',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#333333',
    marginRight: 4,
  },
  tagRemoveButton: {
    padding: 2,
  },
});

export default AddNewCarScreen; 