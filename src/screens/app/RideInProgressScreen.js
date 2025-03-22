import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
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

const RideInProgressScreen = ({ navigation, route }) => {
  const { rideDetails } = route.params || {
    passengerName: 'Esther Howard',
    paymentMethod: 'Cash Payment',
    pickup: '6391 Westheimer RD. San Francisco',
    dropoff: '1901 Thoridgr Cir Shiloh'
  };

  // Handle continue button press
  const handleContinue = () => {
    // Navigate to directions screen
    navigation.navigate('DirectionScreen', { rideDetails });
  };
  
  // Handle location button press
  const handleLocationPress = () => {
    // Navigate to directions screen
    navigation.navigate('DirectionScreen', { rideDetails });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <MapView style={styles.mapView}>
        {/* Route Path - Would be a proper route in a real app */}
        <View style={styles.routePath}>
          {/* Car icon (yellow box representing the car) */}
          <View style={styles.carIcon} />
          
          {/* Route line from car to destination */}
          <View style={styles.routeLineHorizontal} />
          <View style={styles.routeLineVertical} />
          <View style={styles.routeLineHorizontal2} />
          
          {/* Destination pin */}
          <View style={styles.destinationPinContainer}>
            <View style={styles.destinationPin} />
            <View style={styles.destinationDot} />
          </View>
        </View>

        {/* Customer Location Label on Map */}
        <View style={styles.mapLabelContainer}>
          <Text style={styles.mapLabel}>Customer Location</Text>
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
      </SafeAreaView>
      
      {/* Location Button */}
      <TouchableOpacity 
        style={styles.locationButton}
        onPress={handleLocationPress}
      >
        <Ionicons name="locate" size={22} color="#000000" />
      </TouchableOpacity>
      
      {/* Ride Details Card */}
      <View style={styles.rideDetailsContainer}>
        <View style={styles.rideDetailsHeader}>
          <Text style={styles.rideDetailsTitle}>Customer Location</Text>
          <Text style={styles.rideDetailsTime}>5 mins Away</Text>
        </View>
        
        <View style={styles.passengerInfoContainer}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.passengerImage} 
          />
          <View style={styles.passengerDetails}>
            <Text style={styles.passengerName}>{rideDetails.passengerName}</Text>
            <Text style={styles.paymentMethod}>{rideDetails.paymentMethod}</Text>
          </View>
          
          <View style={styles.contactActions}>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble" size={22} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={22} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
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
  },
  mapLabelContainer: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  mapLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  routePath: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  carIcon: {
    position: 'absolute',
    left: '20%',
    top: '50%',
    width: 30,
    height: 18,
    backgroundColor: '#FFD600',
    borderRadius: 4,
  },
  routeLineHorizontal: {
    position: 'absolute',
    left: '20%',
    right: '50%',
    top: '50%',
    height: 3,
    backgroundColor: '#000000',
  },
  routeLineVertical: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    bottom: '40%',
    width: 3,
    backgroundColor: '#000000',
  },
  routeLineHorizontal2: {
    position: 'absolute',
    left: '50%',
    right: '30%',
    top: '40%',
    height: 3,
    backgroundColor: '#000000',
  },
  destinationPinContainer: {
    position: 'absolute',
    right: '30%',
    top: '36%',
    alignItems: 'center',
  },
  destinationPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD600',
    transform: [{ rotate: '45deg' }],
  },
  destinationDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD600',
    top: 5,
  },
  locationButton: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  rideDetailsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rideDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rideDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  rideDetailsTime: {
    fontSize: 16,
    color: '#666666',
  },
  passengerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  passengerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 16,
    color: '#666666',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RideInProgressScreen; 