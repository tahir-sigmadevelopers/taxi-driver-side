import React from 'react';
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

const CarsScreen = ({ navigation }) => {
  // Mock car data
  const carData = {
    model: 'Maruti Suzuki Swift (VX!)',
    category: 'Mini',
    capacity: '4',
    fuelType: 'Petrol',
    lastUpdated: '6 Jun 2023',
    status: 'Under Verification',
    image: 'https://i.ibb.co/rsMxqZf/maruti-swift.png', // Example image URL
  };

  const handleEdit = () => {
    // Navigate to edit car screen
    console.log('Edit car pressed');
  };

  const handleDelete = () => {
    // Show confirmation dialog and delete car
    console.log('Delete car pressed');
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
        
        <Text style={styles.headerTitle}>Cars</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Car Card */}
        <View style={styles.carCard}>
          {/* Car Details Section */}
          <View style={styles.carDetailsSection}>
            {/* Car Image */}
            <View style={styles.carImageContainer}>
              <Image 
                source={{ uri: carData.image }} 
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>
            
            {/* Car Info */}
            <View style={styles.carInfoContainer}>
              {/* Verification Badge */}
              <View style={styles.verificationBadge}>
                <Text style={styles.verificationText}>{carData.status}</Text>
              </View>
              
              {/* Car Model */}
              <Text style={styles.carModel}>{carData.model}</Text>
              
              {/* Car Category */}
              <Text style={styles.carCategory}>{carData.category}</Text>
              
              {/* Car Features */}
              <View style={styles.carFeatures}>
                {/* Capacity */}
                <View style={styles.featureItem}>
                  <Ionicons name="person" size={18} color="#FFD600" />
                  <Text style={styles.featureText}>{carData.capacity}</Text>
                </View>
                
                {/* Fuel Type */}
                <View style={styles.featureItem}>
                  <Ionicons name="car" size={18} color="#FFD600" />
                  <Text style={styles.featureText}>{carData.fuelType}</Text>
                </View>
              </View>
              
              {/* Last Updated */}
              <Text style={styles.lastUpdated}>Last Updated {carData.lastUpdated}</Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 10,
  },
  carCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 15,
  },
  carDetailsSection: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  carImageContainer: {
    width: 130,
    height: 130,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  carImage: {
    width: 120,
    height: 120,
  },
  carInfoContainer: {
    flex: 1,
  },
  verificationBadge: {
    backgroundColor: '#FFF9D9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  verificationText: {
    color: '#FFB800',
    fontSize: 14,
    fontWeight: '500',
  },
  carModel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  carCategory: {
    fontSize: 16,
    color: '#444444',
    marginBottom: 10,
  },
  carFeatures: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#666666',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888888',
  },
  actionButtons: {
    flexDirection: 'row',
    height: 60,
  },
  editButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFD600',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD600',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});

export default CarsScreen; 