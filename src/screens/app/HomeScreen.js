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
  Platform
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from 'react-native-vector-icons';

// Mock map component (in a real app, you'd use react-native-maps)
const MapView = ({ children, style }) => (
  <View style={[styles.mapContainer, style]}>
    <Image 
      source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=600x600&key=YOUR_API_KEY' }} 
      style={styles.mapImage}
      resizeMode="cover"
    />
    {children}
  </View>
);

const HomeScreen = ({ navigation, route }) => {
  // Parameters from navigation
  const locationPermissionGranted = route.params?.locationPermissionGranted !== false;
  
  // State
  const [isOnline, setIsOnline] = useState(true);
  const [preBookedRides, setPreBookedRides] = useState(10);
  const [todayEarnings, setTodayEarnings] = useState(754);
  const [countdownSeconds, setCountdownSeconds] = useState(30);
  const [showRideRequest, setShowRideRequest] = useState(true);
  
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
    setIsOnline(!isOnline);
  };
  
  const handleAcceptRide = () => {
    setShowRideRequest(false);
    // Navigate to ride details or update UI to show accepted ride
    navigation.navigate('RideInProgress', { 
      rideDetails: {
        passengerName: 'Esther Howard',
        paymentMethod: 'Cash Payment',
        pickup: '6391 Westheimer RD. San Francisco',
        dropoff: '1901 Thoridgr Cir Shiloh'
      }
    });
  };
  
  const handleDeclineRide = () => {
    setShowRideRequest(false);
    // In a real app, you'd notify the backend that the ride was declined
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <MapView style={styles.mapView}>
        {/* Countdown timer circle */}
        {showRideRequest && (
          <View style={styles.countdownContainer}>
            <View style={styles.countdownInner}>
              <Text style={styles.countdownNumber}>{countdownSeconds}</Text>
              <Text style={styles.countdownLabel}>Seconds</Text>
            </View>
          </View>
        )}
      </MapView>
      
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <View style={styles.profileContainer}>
          <Ionicons name="person" size={20} color="#FFD600" />
        </View>
        
        <View style={styles.onlineToggleContainer}>
          <Text style={styles.onlineText}>Online</Text>
          <TouchableOpacity 
            style={[styles.onlineToggle, isOnline ? styles.onlineToggleActive : null]} 
            onPress={handleToggleOnline}
          >
            <View style={[styles.toggleCircle, isOnline ? styles.toggleCircleActive : null]} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Ionicons name="calendar" size={24} color="#FFD600" />
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
            <Text style={styles.rideRequestTime}>5 mins Away</Text>
          </View>
          
          <View style={styles.passengerInfoContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.passengerImage} 
            />
            <View style={styles.passengerDetails}>
              <Text style={styles.passengerName}>Esther Howard</Text>
              <Text style={styles.paymentMethod}>Cash Payment</Text>
            </View>
          </View>
          
          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={styles.pickupPoint} />
              <Text style={styles.routeText} numberOfLines={1}>6391 Westheimer RD. San...</Text>
            </View>
            
            <View style={styles.tripDuration}>
              <Text style={styles.tripDurationText}>10 mins trip</Text>
            </View>
            
            <View style={styles.routePoint}>
              <View style={styles.dropoffPoint} />
              <Text style={styles.routeText} numberOfLines={1}>1901 Thoridgr Cir Sh..</Text>
            </View>
          </View>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.declineButton} onPress={handleDeclineRide}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptRide}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

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
    backgroundColor: '#E5E5E5', // Fallback color
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10,
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
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  onlineToggleActive: {
    backgroundColor: '#FFD600',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -45 },
      { translateY: -45 }
    ],
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 5,
    borderColor: '#FFD600',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  countdownInner: {
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  countdownLabel: {
    fontSize: 12,
    color: '#666666',
  },
  rideRequestContainer: {
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
  rideRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rideRequestTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  rideRequestTime: {
    fontSize: 14,
    color: '#666666',
  },
  passengerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#666666',
  },
  routeContainer: {
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  pickupPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
    marginRight: 15,
  },
  dropoffPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFD600',
    marginRight: 15,
  },
  routeText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  tripDuration: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  tripDurationText: {
    fontSize: 12,
    color: '#666666',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  declineButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  declineButtonText: {
    color: '#FFD600',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen; 