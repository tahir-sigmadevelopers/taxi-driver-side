import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  Alert,
  Linking
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import * as Location from 'expo-location';
import socketService from '../../services/socketService';
import { SOCKET_URL } from '../../config';

// Mock map component (in a real app, you'd use react-native-maps)
const MapView = ({ children, style }) => (
  <View style={[styles.mapContainer, style]}>
    <View style={styles.mockMapBackground} />
    {children}
  </View>
);

const RidesScreen = ({ navigation, route }) => {
  // Parameters from navigation
  const initialLocationPermissionGranted = route.params?.locationPermissionGranted === true;
  
  // State
  const [isOnline, setIsOnline] = useState(false); // Start offline if no location permission
  const [preBookedRides, setPreBookedRides] = useState(10);
  const [todayEarnings, setTodayEarnings] = useState(754);
  const [countdownSeconds, setCountdownSeconds] = useState(30);
  const [showRideRequest, setShowRideRequest] = useState(false); // Don't show ride requests until online
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(initialLocationPermissionGranted);
  const [userLocation, setUserLocation] = useState(null);
  
  // New state for current ride request
  const [currentRideRequest, setCurrentRideRequest] = useState(null);
  
  // Check location permission on mount
  useEffect(() => {
    checkLocationPermission();
  }, []);
  
  // Initialize socket connection when online
  useEffect(() => {
    if (isOnline && userLocation) {
      // Setup driver ID (in a real app, this would come from authentication)
      const driverId = '789123';
      
      // Ensure driver coordinates are numbers
      const driverCoordinates = {
        latitude: Number(userLocation.latitude),
        longitude: Number(userLocation.longitude),
        isAvailable: true
      };
      
      console.log('Initializing socket with driver coordinates:', driverCoordinates);
      
      // Initialize socket if not already connected
      if (!socketService.connected) {
        socketService.initialize(driverId, driverCoordinates);
      } else {
        // Update location on socket server
        socketService.updateLocation(driverCoordinates, true);
      }
      
      // Setup ride request handler
      const handleRideRequest = (rideId, userId, pickup, dropoff) => {
        console.log('New ride request received in RidesScreen:', rideId);
        console.log('Pickup:', JSON.stringify(pickup));
        console.log('Dropoff:', JSON.stringify(dropoff));
        
        if (!pickup || !pickup.coordinates) {
          console.error('Received ride request with invalid pickup data');
          return;
        }
        
        // Ensure coordinates are valid numbers
        const pickupCoords = {
          latitude: Number(pickup.coordinates.latitude),
          longitude: Number(pickup.coordinates.longitude)
        };
        
        // Calculate distance to pickup
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          pickupCoords.latitude,
          pickupCoords.longitude
        );
        
        // Calculate ETA
        const eta = calculateETA(distance);
        
        // Set current ride request and show it
        setCurrentRideRequest({
          id: rideId,
          userId,
          pickup,
          dropoff,
          distance,
          distanceText: `${distance.toFixed(1)} mi`,
          eta,
          etaText: `${eta} min`
        });
        
        // Show the ride request and reset countdown
        setShowRideRequest(true);
        setCountdownSeconds(30); // Reset countdown timer
      };
      
      // Register for ride request events using both callback names
      socketService.on('rideRequest', handleRideRequest);
      socketService.on('onRideRequest', handleRideRequest);
      
      // Cleanup
      return () => {
        socketService.on('rideRequest', null);
        socketService.on('onRideRequest', null);
      };
    }
  }, [isOnline, userLocation]);
  
  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return 0;
    }
    
    try {
      const R = 3958.8; // Earth's radius in miles
      const lat1Rad = lat1 * Math.PI / 180;
      const lat2Rad = lat2 * Math.PI / 180;
      const lon1Rad = lon1 * Math.PI / 180;
      const lon2Rad = lon2 * Math.PI / 180;
      
      const dlon = lon2Rad - lon1Rad;
      const dlat = lat2Rad - lat1Rad;
      const a = Math.sin(dlat/2)**2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon/2)**2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      return distance;
    } catch (error) {
      console.error('Error calculating distance:', error);
      return 0;
    }
  };
  
  // Function to calculate ETA in minutes
  const calculateETA = (distanceInMiles, averageSpeedMph = 30) => {
    const timeInHours = distanceInMiles / averageSpeedMph;
    const timeInMinutes = Math.ceil(timeInHours * 60);
    return Math.max(1, timeInMinutes); // Minimum 1 minute
  };
  
  // When locationPermissionGranted changes, update isOnline status
  useEffect(() => {
    if (locationPermissionGranted) {
      getLocation();
    } else {
      setIsOnline(false);
    }
  }, [locationPermissionGranted]);
  
  // Function to check if location permission is granted
  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      console.log('Location permission status in RidesScreen:', status);
      setLocationPermissionGranted(status === 'granted');
    } catch (error) {
      console.error('Error checking location permission:', error);
      setLocationPermissionGranted(false);
    }
  };
  
  // Function to request location permission
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission request result:', status);
      setLocationPermissionGranted(status === 'granted');
      
      if (status === 'granted') {
        getLocation();
      } else {
        Alert.alert(
          "Location Permission Required",
          "We need location access to connect you with nearby rides. Please enable location access in your device settings.",
          [
            { text: "Open Settings", onPress: openLocationSettings },
            { text: "Cancel", style: "cancel" }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };
  
  // Function to open device settings for location
  const openLocationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };
  
  // Function to get user's current location
  const getLocation = async () => {
    try {
      if (!locationPermissionGranted) {
        console.log('Location permission not granted, cannot get location');
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });
      
      console.log('Got user location:', location.coords);
      setUserLocation(location.coords);
      
      // Now that we have location, allow user to go online
      setIsOnline(true);
      // Show the ride request after getting location (in a real app, this would come from the server)
      setShowRideRequest(true);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        "Error",
        "Failed to get your location. Please check your device settings and try again.",
        [{ text: "OK" }]
      );
    }
  };
  
  // Mock countdown timer
  useEffect(() => {
    if (countdownSeconds > 0 && showRideRequest) {
      const timer = setTimeout(() => {
        setCountdownSeconds(countdownSeconds - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdownSeconds === 0 && showRideRequest) {
      // Auto-decline when timer reaches 0
      handleDeclineRide();
    }
  }, [countdownSeconds, showRideRequest]);
  
  const handleToggleOnline = () => {
    if (!locationPermissionGranted) {
      requestLocationPermission();
      return;
    }
    
    if (!isOnline) {
      // Going online
      getLocation();
    } else {
      // Going offline
      setIsOnline(false);
      setShowRideRequest(false);
    }
  };
  
  const handleAcceptRide = () => {
    if (!currentRideRequest) {
      setShowRideRequest(false);
      return;
    }
    
    // Send ride request to the user
    if (socketService.connected) {
      socketService.sendRideRequest(currentRideRequest.id, currentRideRequest.userId);
      
      // Navigate to ride requests screen to see request status
      navigation.navigate('RideRequestsScreen');
    }
    
    setShowRideRequest(false);
  };
  
  const handleDeclineRide = () => {
    setShowRideRequest(false);
    setCurrentRideRequest(null);
    // In a real app, you'd notify the backend that the ride was declined
  };

  // Add a startup notification when the component mounts
  useEffect(() => {
    // Show startup information and status
    console.log('==== DRIVER APP INITIALIZATION ====');
    console.log('Driver app initialized with socket URL:', SOCKET_URL);
    console.log('Driver ID:', '789123'); // Fixed hardcoded driver ID reference
    console.log('App version: 1.0.1');
    console.log('==================================');
    
    // Alert the user that the app is ready
    Alert.alert(
      'Driver App Ready',
      'App has been initialized. You will now be able to receive ride requests.',
      [{ text: 'OK' }]
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View style={styles.container}>
        <MapView style={styles.mapView} />
        
        {/* Location Permission Overlay */}
        {!locationPermissionGranted && (
          <View style={styles.permissionOverlay}>
            <View style={styles.permissionCard}>
              <View style={styles.permissionIconContainer}>
                <Ionicons name="location" size={50} color="#FFD600" />
              </View>
              <Text style={styles.permissionTitle}>Location Access Required</Text>
              <Text style={styles.permissionDescription}>
                We need access to your location to connect you with nearby rides and provide accurate pickup times.
              </Text>
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={requestLocationPermission}
              >
                <Text style={styles.permissionButtonText}>Enable Location Access</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Countdown timer circle - moved outside MapView */}
        {showRideRequest && (
          <View style={styles.countdownContainer}>
            <View style={styles.countdownCircle}>
              <View style={styles.countdownArc} />
              <View style={styles.countdownInner}>
                <Text style={styles.countdownNumber}>{countdownSeconds}</Text>
                <Text style={styles.countdownLabel}>Seconds</Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.headerBackButton} 
            onPress={() => navigation.goBack()}
            accessible={true}
            accessibilityLabel="Back button"
            accessibilityHint="Navigate back to previous screen"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          
          <View style={styles.userAndToggleRow}>
            <View style={styles.profileContainer}>
              <Ionicons name="person" size={20} color="#FFD600" />
            </View>
            
            <View style={styles.onlineToggleContainer}>
              <Text style={styles.onlineText}>Online</Text>
              <TouchableOpacity 
                style={[styles.onlineToggle, isOnline ? styles.onlineToggleActive : null]} 
                onPress={handleToggleOnline}
                accessible={true}
                accessibilityLabel={isOnline ? "Go offline" : "Go online"}
                accessibilityHint={isOnline ? "Stop receiving ride requests" : "Start receiving ride requests"}
                accessibilityState={{checked: isOnline}}
                accessibilityRole="switch"
              >
                <View style={[styles.toggleCircle, isOnline ? styles.toggleCircleActive : null]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="calendar" size={24} color="#000000" />
            </View>
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Pre - Booked</Text>
              <Text style={styles.statValue}>{preBookedRides}</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.dollarSign}>$</Text>
            </View>
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Today Earned</Text>
              <Text style={styles.statValue}>${todayEarnings.toFixed(2)}</Text>
            </View>
          </View>
        </View>
        
        {/* Ride Request Card */}
        {showRideRequest && (
          <View style={styles.rideRequestContainer}>
            <View style={styles.rideRequestHeader}>
              <Text style={styles.rideRequestTitle}>Ride Request</Text>
              <Text style={styles.rideRequestTime}>{countdownSeconds}s</Text>
            </View>
            
            <View style={styles.passengerInfoContainer}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                style={styles.passengerImage} 
              />
              <View style={styles.passengerDetails}>
                <Text style={styles.passengerName}>New Passenger</Text>
                <Text style={styles.paymentMethod}>Cash Payment</Text>
              </View>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routePoint}>
                <View style={styles.pickupPoint} />
                <Text style={styles.routeText} numberOfLines={1}>
                  {currentRideRequest?.pickup?.address || 'Pickup Location'}
                </Text>
              </View>
              
              <View style={styles.tripDuration}>
                <Text style={styles.tripDurationText}>
                  {currentRideRequest?.distanceText || '0.0 mi'} • {currentRideRequest?.etaText || '0 min'}
                </Text>
              </View>
              
              <View style={styles.routePoint}>
                <View style={styles.dropoffPoint} />
                <Text style={styles.routeText} numberOfLines={1}>
                  {currentRideRequest?.dropoff?.address || 'Destination Location'}
                </Text>
              </View>
            </View>
            
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={styles.declineButton} 
                onPress={handleDeclineRide}
                accessible={true}
                accessibilityLabel="Decline ride"
                accessibilityHint="Decline this ride request"
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.acceptButton} 
                onPress={handleAcceptRide}
                accessible={true}
                accessibilityLabel="Accept ride"
                accessibilityHint="Accept this ride request"
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Location Button */}
        <TouchableOpacity 
          style={[
            styles.locationButton, 
            { bottom: showRideRequest ? 280 : 40 }
          ]}
          accessible={true}
          accessibilityLabel="Current location"
          accessibilityHint="Center map on your current location"
        >
          <Ionicons name="locate" size={22} color="#000000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
    backgroundColor: '#E6EEF5', // Light blue-gray background that matches the image
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
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
  userAndToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  profileContainer: {
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
  onlineToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  onlineText: {
    marginRight: 8,
    fontWeight: '600',
  },
  onlineToggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  onlineToggleActive: {
    backgroundColor: '#FFD600',
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  toggleCircleActive: {
    marginLeft: 'auto',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 80,
    zIndex: 10,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dollarSign: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  statTextContainer: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  countdownContainer: {
    position: 'absolute',
    top: '42%',
    left: '50%',
    transform: [
      { translateX: -45 },
      { translateY: -45 }
    ],
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    marginBottom: 60,
  },
  countdownCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  countdownArc: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#FFD600',
    borderTopColor: '#FFD600',
    transform: [{ rotate: '135deg' }],
  },
  countdownInner: {
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD600',
  },
  countdownLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: -2,
  },
  rideRequestContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 20,
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
  rideRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rideRequestTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  rideRequestTime: {
    fontSize: 16,
    color: '#666666',
  },
  passengerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingBottom: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#666666',
  },
  routeContainer: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  pickupPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
    marginRight: 12,
  },
  dropoffPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFD600',
    marginRight: 12,
  },
  routeText: {
    fontSize: 15,
    color: '#000000',
    flex: 1,
  },
  tripDuration: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  tripDurationText: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 10,
  },
  declineButtonText: {
    color: '#FFD600',
    fontSize: 18,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  locationButton: {
    position: 'absolute',
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
  permissionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  permissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  permissionIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default RidesScreen; 