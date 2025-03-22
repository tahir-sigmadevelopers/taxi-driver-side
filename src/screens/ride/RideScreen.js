import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';

const RideScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeRide, setActiveRide] = useState(null);
  const [rideStatus, setRideStatus] = useState('waiting'); // waiting, pickup, inProgress, completed
  const mapRef = useRef(null);

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Mock active ride data
      if (!activeRide) {
        const mockRide = {
          id: 'ride123',
          passenger: {
            id: 'user1',
            name: 'Alex Johnson',
            rating: 4.7,
            photo: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          pickup: {
            address: '123 Main Street, Downtown',
            latitude: location.coords.latitude + 0.002,
            longitude: location.coords.longitude - 0.001,
          },
          dropoff: {
            address: '456 Oak Avenue, Uptown',
            latitude: location.coords.latitude + 0.006,
            longitude: location.coords.longitude + 0.004,
          },
          fare: '$18.50',
          distance: '3.2 km',
          duration: '12 min',
          timestamp: new Date().toISOString()
        };
        setActiveRide(mockRide);
      }
    })();
  }, []);

  const updateRideStatus = (newStatus) => {
    setRideStatus(newStatus);
    
    // In a real app, you would update the backend with the new status
    switch (newStatus) {
      case 'pickup':
        Alert.alert('Heading to pickup', 'You\'re now heading to pick up the passenger.');
        break;
      case 'inProgress':
        Alert.alert('Ride started', 'The ride has started. Drive safely!');
        break;
      case 'completed':
        Alert.alert('Ride completed', 'The ride has been completed successfully!');
        // After a delay, reset to waiting state
        setTimeout(() => {
          setRideStatus('waiting');
          setActiveRide(null);
        }, 3000);
        break;
    }
  };

  const cancelRide = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this ride?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Ride cancelled', 'The ride has been cancelled.');
            setRideStatus('waiting');
            setActiveRide(null);
          },
        },
      ]
    );
  };

  const renderActionButton = () => {
    switch (rideStatus) {
      case 'waiting':
        return activeRide ? (
          <TouchableOpacity
            style={[styles.actionButton, styles.pickupButton]}
            onPress={() => updateRideStatus('pickup')}
          >
            <Text style={styles.actionButtonText}>Accept & Head to Pickup</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.actionButton, styles.noRideButton]}>
            <Text style={styles.actionButtonText}>No Active Rides</Text>
          </View>
        );
      case 'pickup':
        return (
          <TouchableOpacity
            style={[styles.actionButton, styles.startRideButton]}
            onPress={() => updateRideStatus('inProgress')}
          >
            <Text style={styles.actionButtonText}>Start Ride</Text>
          </TouchableOpacity>
        );
      case 'inProgress':
        return (
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => updateRideStatus('completed')}
          >
            <Text style={styles.actionButtonText}>Complete Ride</Text>
          </TouchableOpacity>
        );
      case 'completed':
        return (
          <View style={[styles.actionButton, styles.completedButton]}>
            <Text style={styles.actionButtonText}>Ride Completed</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Map View */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {/* Driver Marker */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
            >
              <View style={styles.markerContainer}>
                <Ionicons name="car" size={24} color="#0066FF" />
              </View>
            </Marker>

            {/* Pickup Marker */}
            {activeRide && (rideStatus === 'waiting' || rideStatus === 'pickup') && (
              <Marker
                coordinate={{
                  latitude: activeRide.pickup.latitude,
                  longitude: activeRide.pickup.longitude,
                }}
                title="Pickup Location"
              >
                <View style={styles.pickupMarkerContainer}>
                  <Ionicons name="location" size={24} color="#4CAF50" />
                </View>
              </Marker>
            )}

            {/* Dropoff Marker */}
            {activeRide && (
              <Marker
                coordinate={{
                  latitude: activeRide.dropoff.latitude,
                  longitude: activeRide.dropoff.longitude,
                }}
                title="Dropoff Location"
              >
                <View style={styles.dropoffMarkerContainer}>
                  <Ionicons name="location" size={24} color="#F44336" />
                </View>
              </Marker>
            )}
          </MapView>
        ) : (
          <View style={[styles.map, styles.loadingMap]}>
            <Text>Getting your location...</Text>
          </View>
        )}
      </View>

      {/* Ride Details */}
      <View style={styles.detailsContainer}>
        {activeRide ? (
          <ScrollView>
            {/* Passenger Info */}
            <View style={styles.passengerCard}>
              <View style={styles.passengerInfo}>
                <Image
                  source={{ uri: activeRide.passenger.photo }}
                  style={styles.passengerPhoto}
                />
                <View style={styles.passengerDetails}>
                  <Text style={styles.passengerName}>{activeRide.passenger.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFB800" />
                    <Text style={styles.ratingText}>{activeRide.passenger.rating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="call" size={20} color="#0066FF" />
              </TouchableOpacity>
            </View>

            {/* Ride Status */}
            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>
                {rideStatus === 'waiting' ? 'New Ride Request' :
                 rideStatus === 'pickup' ? 'Heading to Pickup' :
                 rideStatus === 'inProgress' ? 'Ride in Progress' : 'Ride Completed'}
              </Text>
              <View style={styles.tripDetails}>
                <View style={styles.tripItem}>
                  <Text style={styles.tripLabel}>Distance</Text>
                  <Text style={styles.tripValue}>{activeRide.distance}</Text>
                </View>
                <View style={styles.tripItem}>
                  <Text style={styles.tripLabel}>Duration</Text>
                  <Text style={styles.tripValue}>{activeRide.duration}</Text>
                </View>
                <View style={styles.tripItem}>
                  <Text style={styles.tripLabel}>Fare</Text>
                  <Text style={styles.tripValue}>{activeRide.fare}</Text>
                </View>
              </View>
            </View>

            {/* Location Details */}
            <View style={styles.locationCard}>
              <View style={styles.locationItem}>
                <View style={styles.locationIconContainer}>
                  <View style={styles.pickupDot} />
                </View>
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationLabel}>Pickup</Text>
                  <Text style={styles.locationValue}>{activeRide.pickup.address}</Text>
                </View>
              </View>
              <View style={styles.locationDivider} />
              <View style={styles.locationItem}>
                <View style={styles.locationIconContainer}>
                  <View style={styles.dropoffDot} />
                </View>
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationLabel}>Dropoff</Text>
                  <Text style={styles.locationValue}>{activeRide.dropoff.address}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              {renderActionButton()}
              
              {(rideStatus === 'waiting' || rideStatus === 'pickup') && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelRide}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.noRideContainer}>
            <Ionicons name="car-outline" size={60} color="#CCCCCC" />
            <Text style={styles.noRideText}>No active rides</Text>
            <Text style={styles.noRideSubtext}>
              New ride requests will appear here
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.4,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingMap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E4E8',
  },
  detailsContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  markerContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: '#0066FF',
  },
  pickupMarkerContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  dropoffMarkerContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: '#F44336',
  },
  passengerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  passengerDetails: {
    justifyContent: 'center',
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#E8F1FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripItem: {
    alignItems: 'center',
  },
  tripLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  tripValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  locationIconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 10,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  dropoffDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F44336',
  },
  locationDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#DDD',
    marginLeft: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 16,
    color: '#333',
  },
  actionContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  actionButton: {
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  pickupButton: {
    backgroundColor: '#4CAF50',
  },
  startRideButton: {
    backgroundColor: '#0066FF',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  completedButton: {
    backgroundColor: '#A5C8FF',
  },
  noRideButton: {
    backgroundColor: '#CCCCCC',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noRideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noRideText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  noRideSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default RideScreen; 