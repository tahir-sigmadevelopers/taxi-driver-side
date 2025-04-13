import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import carService from '../../services/carService';

const CarsScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      console.log('fetching cars');
      
      const response = await carService.getAllCars();
      if (response.success) {
        setCars(response.data);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      Alert.alert('Error', 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car) => {
    // Navigate to edit car screen with car data
    navigation.navigate('AddNewCarScreen', { car });
  };

  const handleDelete = async (carId) => {
    Alert.alert('Delete Car', 'Are you sure you want to delete this car?', [
      { 
        text: 'Cancel', 
        style: 'cancel' 
      },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: async () => {
          try {
            await carService.deleteCar(carId);
            // Refresh the cars list
            fetchCars();
            Alert.alert('Success', 'Car deleted successfully');
          } catch (error) {
            Alert.alert('Error', error.message || 'Failed to delete car');
          }
        }
      }
    ]);
  };

  const handleAddNewCar = () => {
    navigation.navigate('AddNewCarScreen');
  };

  const renderCarCard = (car) => (
    <View key={car._id} style={styles.carCard}>
      {/* Car Details Section */}
      <View style={styles.carDetailsSection}>
        {/* Car Image */}
        <View style={styles.carImageContainer}>
          {car.images && car.images.length > 0 ? (
            <Image
              source={{ uri: car.images[0] }}
              style={styles.carImage}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="car" size={50} color="#FFD600" />
          )}
        </View>

        {/* Car Info */}
        <View style={styles.carInfoContainer}>
          {/* Verification Badge */}
          <View style={styles.verificationBadge}>
            <Text style={styles.verificationText}>Active</Text>
          </View>

          {/* Car Model */}
          <Text style={styles.carModel}>{car.name}</Text>

          {/* Car Category */}
          <Text style={styles.carCategory}>{car.type}</Text>

          {/* Car Features */}
          <View style={styles.carFeatures}>
            {/* Fuel Type */}
            <View style={styles.featureItem}>
              <Ionicons name="car" size={18} color="#FFD600" />
              <Text style={styles.featureText}>{car.fuelType}</Text>
            </View>

            {/* Car Number */}
            <View style={styles.featureItem}>
              <Ionicons name="document-text" size={18} color="#FFD600" />
              <Text style={styles.featureText}>{car.number}</Text>
            </View>
          </View>

          {/* Features List */}
          <View style={styles.featuresList}>
            {car.features && car.features.map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureTagText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => handleEdit(car)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => handleDelete(car._id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
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

        <Text style={styles.headerTitle}>Cars</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD600" />
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {cars.length > 0 ? (
            cars.map(renderCarCard)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No cars found</Text>
              <TouchableOpacity 
                style={styles.addFirstCarButton}
                onPress={handleAddNewCar}
              >
                <Text style={styles.addFirstCarButtonText}>Add Your First Car</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      {/* Add New Car Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddNewCar}
      >
        <Ionicons name="add" size={24} color="#000000" />
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  addFirstCarButton: {
    backgroundColor: '#FFD600',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addFirstCarButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  featureTag: {
    backgroundColor: '#FFF9D9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  featureTagText: {
    color: '#FFB800',
    fontSize: 12,
  },
});

export default CarsScreen; 