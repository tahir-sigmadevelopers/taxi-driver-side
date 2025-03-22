import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  ScrollView,
  Alert,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [recentRides, setRecentRides] = useState([]);
  const mapRef = useRef(null);

  // Request location permissions and get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Mock data for demonstration
      setTodayEarnings(120.50);
      setTotalRides(5);
      setRecentRides([
        { id: 1, from: 'Downtown', to: 'Airport', amount: 24.50, date: 'Today, 10:30 AM' },
        { id: 2, from: 'Shopping Mall', to: 'Pine Street', amount: 18.75, date: 'Today, 12:15 PM' },
        { id: 3, from: 'Central Park', to: 'Main Square', amount: 32.00, date: 'Today, 3:45 PM' },
      ]);
    })();
  }, []);

  // Mock data for ride requests
  useEffect(() => {
    if (isOnline && location) {
      // This would typically come from your socket connection
      const mockRequests = [
        {
          id: '1',
          user: {
            id: 'user1',
            name: 'John Doe',
            rating: 4.8,
            trips: 24
          },
          pickup: {
            address: '123 Main St, Anytown',
            latitude: location.coords.latitude + 0.002,
            longitude: location.coords.longitude - 0.001
          },
          dropoff: {
            address: '456 Oak Ave, Anytown',
            latitude: location.coords.latitude + 0.005,
            longitude: location.coords.longitude + 0.003
          },
          distance: '2.3 km',
          duration: '8 min',
          fare: '$12.50',
          timestamp: new Date()
        },
        {
          id: '2',
          user: {
            id: 'user2',
            name: 'Jane Smith',
            rating: 4.6,
            trips: 12
          },
          pickup: {
            address: '789 Pine Rd, Anytown',
            latitude: location.coords.latitude - 0.001,
            longitude: location.coords.longitude + 0.002
          },
          dropoff: {
            address: '101 Cedar Blvd, Anytown',
            latitude: location.coords.latitude - 0.004,
            longitude: location.coords.longitude - 0.002
          },
          distance: '3.5 km',
          duration: '12 min',
          fare: '$15.75',
          timestamp: new Date()
        }
      ];

      setRideRequests(mockRequests);
    } else {
      setRideRequests([]);
    }
  }, [isOnline, location]);

  const handleGoOnline = () => {
    if (!location) {
      Alert.alert('Location Required', 'Please enable location services to go online');
      return;
    }
    setIsOnline(!isOnline);
  };

  const handleRequestPress = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleAcceptRequest = () => {
    // This would typically send an acceptance message via your socket connection
    setShowRequestModal(false);
    
    // For demo purposes, navigate to the ride details screen
    navigation.navigate('RideDetails', { ride: selectedRequest });
  };

  const handleRejectRequest = () => {
    // This would typically send a rejection message via your socket connection
    setShowRequestModal(false);
    
    // Remove the request from the list
    setRideRequests(rideRequests.filter(req => req.id !== selectedRequest.id));
    setSelectedRequest(null);
  };

  let locationDisplay = 'Waiting for location...';
  if (errorMsg) {
    locationDisplay = errorMsg;
  } else if (location) {
    locationDisplay = `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`;
  }

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
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Driver Marker */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            >
              <View style={styles.markerContainer}>
                <Ionicons name="car" size={24} color="#FFB800" />
              </View>
            </Marker>

            {/* Ride Request Markers */}
            {isOnline && rideRequests.map((request) => (
              <Marker
                key={request.id}
                coordinate={{
                  latitude: request.pickup.latitude,
                  longitude: request.pickup.longitude,
                }}
                title={`Pickup: ${request.pickup.address}`}
                onPress={() => handleRequestPress(request)}
              >
                <View style={styles.requestMarkerContainer}>
                  <Ionicons name="person" size={20} color="#fff" />
                </View>
              </Marker>
            ))}
          </MapView>
        ) : (
          <View style={[styles.map, styles.loadingMap]}>
            <Text>{locationDisplay}</Text>
          </View>
        )}
        
        {/* Online/Offline Toggle */}
        <TouchableOpacity 
          style={[
            styles.statusButton, 
            isOnline ? styles.onlineButton : styles.offlineButton
          ]} 
          onPress={handleGoOnline}
        >
          <Text style={styles.statusButtonText}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Earnings and Stats */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsTitle}>Today's Earnings</Text>
            <TouchableOpacity>
              <Ionicons name="calendar-outline" size={24} color="#0066FF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.earningsAmount}>${todayEarnings.toFixed(2)}</Text>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalRides}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{isOnline ? 'Active' : 'Inactive'}</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>
        </View>

        {/* Recent Rides */}
        <View style={styles.recentRidesContainer}>
          <Text style={styles.sectionTitle}>Recent Rides</Text>
          {recentRides.length > 0 ? (
            recentRides.map(ride => (
              <View key={ride.id} style={styles.rideCard}>
                <View style={styles.rideDetails}>
                  <View style={styles.routeContainer}>
                    <View style={styles.routePoint}>
                      <View style={styles.originDot} />
                      <Text style={styles.routeText}>{ride.from}</Text>
                    </View>
                    <View style={styles.routeLine} />
                    <View style={styles.routePoint}>
                      <View style={styles.destinationDot} />
                      <Text style={styles.routeText}>{ride.to}</Text>
                    </View>
                  </View>
                  <View style={styles.rideInfo}>
                    <Text style={styles.rideAmount}>${ride.amount.toFixed(2)}</Text>
                    <Text style={styles.rideDate}>{ride.date}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noRidesText}>No recent rides</Text>
          )}
        </View>
      </ScrollView>

      {/* Request Cards */}
      {isOnline && rideRequests.length > 0 && (
        <View style={styles.requestsContainer}>
          <Text style={styles.requestsTitle}>Nearby Requests</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {rideRequests.map((request) => (
              <TouchableOpacity
                key={request.id}
                style={styles.requestCard}
                onPress={() => handleRequestPress(request)}
              >
                <View style={styles.requestHeader}>
                  <Text style={styles.requestUser}>{request.user.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text style={styles.ratingText}>{request.user.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.tripDetails}>
                  <View style={styles.locationRow}>
                    <Ionicons name="radio-button-on" size={16} color="green" />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {request.pickup.address}
                    </Text>
                  </View>
                  <View style={styles.locationLine} />
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="red" />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {request.dropoff.address}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.tripFooter}>
                  <Text style={styles.fareText}>{request.fare}</Text>
                  <Text style={styles.distanceText}>{request.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Ride Request Modal */}
      <Modal
        visible={showRequestModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Ride Request</Text>
              <TouchableOpacity onPress={() => setShowRequestModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedRequest && (
              <>
                <View style={styles.userInfo}>
                  <Ionicons name="person-circle-outline" size={50} color="#666" />
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{selectedRequest.user.name}</Text>
                    <View style={styles.userRating}>
                      <Ionicons name="star" size={16} color="#FFB800" />
                      <Text style={styles.ratingValue}>{selectedRequest.user.rating}</Text>
                      <Text style={styles.tripCount}>({selectedRequest.user.trips} trips)</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />
                
                <View style={styles.tripInfo}>
                  <View style={styles.tripRow}>
                    <View style={styles.tripIcon}>
                      <Ionicons name="radio-button-on" size={20} color="green" />
                    </View>
                    <View style={styles.tripTextContainer}>
                      <Text style={styles.tripLabel}>PICKUP</Text>
                      <Text style={styles.tripValue}>{selectedRequest.pickup.address}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.verticalLine} />
                  
                  <View style={styles.tripRow}>
                    <View style={styles.tripIcon}>
                      <Ionicons name="location" size={20} color="red" />
                    </View>
                    <View style={styles.tripTextContainer}>
                      <Text style={styles.tripLabel}>DROPOFF</Text>
                      <Text style={styles.tripValue}>{selectedRequest.dropoff.address}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />
                
                <View style={styles.fareInfo}>
                  <View style={styles.fareDetail}>
                    <Text style={styles.fareLabel}>Distance</Text>
                    <Text style={styles.fareValue}>{selectedRequest.distance}</Text>
                  </View>
                  <View style={styles.fareDetail}>
                    <Text style={styles.fareLabel}>Est. Duration</Text>
                    <Text style={styles.fareValue}>{selectedRequest.duration}</Text>
                  </View>
                  <View style={styles.fareDetail}>
                    <Text style={styles.fareLabel}>Fare</Text>
                    <Text style={[styles.fareValue, styles.fareAmount]}>{selectedRequest.fare}</Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={handleRejectRequest}
                  >
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.acceptButton]}
                    onPress={handleAcceptRequest}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    position: 'relative',
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
  statusButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  onlineButton: {
    backgroundColor: '#4CAF50',
  },
  offlineButton: {
    backgroundColor: '#F44336',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  earningsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningsTitle: {
    fontSize: 16,
    color: '#333',
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recentRidesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  rideCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeContainer: {
    flex: 3,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  originDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F44336',
    marginRight: 8,
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: '#DDD',
    marginLeft: 5,
  },
  routeText: {
    fontSize: 14,
    color: '#333',
  },
  rideInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rideAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066FF',
  },
  rideDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  noRidesText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  requestsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  requestsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#333',
  },
  tripDetails: {
    marginBottom: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    marginLeft: 8,
    flex: 1,
    color: '#555',
  },
  locationLine: {
    width: 1,
    height: 20,
    backgroundColor: '#ddd',
    marginLeft: 8,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  distanceText: {
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userDetails: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  tripCount: {
    marginLeft: 5,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  tripInfo: {
    marginVertical: 10,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  tripIcon: {
    width: 30,
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 25,
    backgroundColor: '#ddd',
    marginLeft: 15,
    marginBottom: 10,
  },
  tripTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  tripLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  tripValue: {
    fontSize: 15,
    color: '#333',
  },
  fareInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  fareDetail: {
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  fareValue: {
    fontSize: 16,
    color: '#333',
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB800',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButton: {
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: '#FFB800',
    marginLeft: 10,
  },
  rejectButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen; 