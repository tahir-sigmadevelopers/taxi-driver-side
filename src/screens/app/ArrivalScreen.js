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

const ArrivalScreen = ({ navigation, route }) => {
  const { rideDetails } = route.params || {
    passengerName: 'Esther Howard',
    paymentMethod: 'Cash Payment',
    pickup: '6391 Elgin St. Celina, Delaware 10299',
    dropoff: '1901 Thoridgr Cir Shiloh'
  };

  // Handle OTP button press
  const handleAskForOTP = () => {
    // In a real app, this would prompt the customer for an OTP via SMS/notification
    console.log('Requesting OTP verification');
    
    // Navigate to OTP verification screen
    navigation.navigate('OTPVerificationScreen', {
      rideDetails: {
        ...rideDetails,
        passengerName: rideDetails.passengerName || 'Esther Howard',
        passengerMobile: rideDetails.passengerMobile || '+1 (555) 123-4567',
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <MapView style={styles.mapView}>
        {/* Driver car icon */}
        <View style={styles.carIcon} />
        
        {/* Customer location pin - Only visible on the map, not over the confirmation card */}
        <View style={styles.pinContainer}>
          <View style={styles.pinOuter} />
          <View style={styles.pinInner} />
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
        
        <Text style={styles.headerTitle}>Arrived At Destination</Text>
      </SafeAreaView>
      
      {/* Confirmation Bottom Sheet */}
      <View style={styles.confirmationContainer}>
        {/* Divider line */}
        <View style={styles.dividerLine} />
        
        {/* Checkmark icon */}
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark" size={40} color="#FFFFFF" />
        </View>
        
        {/* Confirmation text */}
        <Text style={styles.confirmationTitle}>Arrived At Customer Location</Text>
        
        {/* Address display */}
        <Text style={styles.addressText}>{rideDetails.pickup}</Text>
        
        {/* OTP Button */}
        <TouchableOpacity 
          style={styles.otpButton}
          onPress={handleAskForOTP}
        >
          <Text style={styles.otpButtonText}>Ask for OTP</Text>
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
    zIndex: 1,
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
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    zIndex: 20,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 20,
  },
  carIcon: {
    position: 'absolute',
    right: '40%',
    top: '50%',
    width: 30,
    height: 18,
    backgroundColor: '#FFD600',
    borderRadius: 4,
    zIndex: 2,
  },
  pinContainer: {
    position: 'absolute',
    right: '30%',
    top: '45%',
    alignItems: 'center',
    zIndex: 2,
  },
  pinOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 214, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinInner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD600',
  },
  confirmationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 15,
  },
  dividerLine: {
    width: 60,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  addressText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  otpButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  otpButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ArrivalScreen; 