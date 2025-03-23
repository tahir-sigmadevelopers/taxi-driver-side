import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

// Mock map component (in a real app, you'd use react-native-maps)
const MapView = ({ children, style }) => (
  <View style={[styles.mapContainer, style]}>
    <View style={styles.mockMapBackground} />
    {children}
  </View>
);

const DestinationScreen = ({ navigation, route }) => {
  const { rideDetails } = route.params || {
    passengerName: 'Esther Howard',
    paymentMethod: 'Cash Payment',
    pickup: '6391 Elgin St. Celina, Delaware 10299',
    dropoff: '1901 Thornridge Cir. Shiloh Hawaii 81063',
    distance: '16 miles',
    otpCode: '7854',
    fareAmount: 12.5
  };

  // Handle navigation button press
  const handleNavigateToDestination = () => {
    // In a real app, this would open the device's map application 
    // or navigate the driver to the destination
    console.log('Navigating to destination');
    
    // After navigation is complete, in a real app this would happen
    // when the driver is close to the destination
    setTimeout(() => {
      navigation.navigate('ArrivalScreen', { rideDetails });
    }, 500); // Short delay to simulate navigation
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <MapView style={styles.mapView}>
        {/* Route Path - Would be a proper route in a real app */}
        <View style={styles.routePath}>
          {/* Starting point (Pickup) */}
          <View style={styles.pickupLocationMarker} />
          
          {/* Route lines */}
          <View style={styles.routeLineHorizontal} />
          <View style={styles.routeLineVertical} />
          <View style={styles.routeLineHorizontal2} />
          
          {/* Driver location marker */}
          <View style={styles.driverLocationContainer}>
            <View style={styles.driverLocationMarker}>
              <Ionicons name="navigate" size={18} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </MapView>
      
      {/* Header */}
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.headerBackButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Destination</Text>
      </SafeAreaView>
      
      {/* Address Card */}
      <View style={styles.addressCardContainer}>
        <View style={styles.addressCard}>
          <View style={styles.locationIconContainer}>
            <Ionicons name="location" size={24} color="#FFD600" />
          </View>
          <Text style={styles.addressText}>{rideDetails.dropoff}</Text>
        </View>
      </View>
      
      {/* Navigation Button */}
      <View style={styles.navigationButtonContainer}>
        <TouchableOpacity 
          style={styles.navigationButton}
          onPress={handleNavigateToDestination}
        >
          <Text style={styles.navigationButtonText}>Navigate to Destination</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  mockMapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E6EEF5', // Light blue-gray background
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
    marginBottom: 5,
    zIndex: 10,
  },
  headerBackButton: {
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
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 20,
  },
  routePath: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pickupLocationMarker: {
    position: 'absolute',
    left: '40%',
    top: '40%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD600',
    borderWidth: 8,
    borderColor: 'rgba(255, 214, 0, 0.3)',
    zIndex: 2,
  },
  routeLineHorizontal: {
    position: 'absolute',
    left: '40%',
    right: '50%',
    top: '40%',
    height: 3,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  routeLineVertical: {
    position: 'absolute',
    left: '50%',
    top: '40%',
    bottom: '60%',
    width: 3,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  routeLineHorizontal2: {
    position: 'absolute',
    left: '50%',
    right: '30%',
    top: '60%',
    height: 3,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  driverLocationContainer: {
    position: 'absolute',
    right: '30%',
    top: '56%',
    alignItems: 'center',
    zIndex: 2,
  },
  driverLocationMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressCardContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationIconContainer: {
    marginRight: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  navigationButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  navigationButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DestinationScreen; 