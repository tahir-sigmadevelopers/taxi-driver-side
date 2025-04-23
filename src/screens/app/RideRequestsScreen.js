import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import socketService from '../../services/socketService';

const RideRequestsScreen = ({ navigation, route }) => {
  const [rideRequests, setRideRequests] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState({});
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseType, setResponseType] = useState(null); // 'accepted' or 'rejected'
  const [currentRideId, setCurrentRideId] = useState(null);
  
  // New state for showing incoming request modal
  const [incomingRequestModalVisible, setIncomingRequestModalVisible] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState(null);
  
  // Mock driver data (in a real app, this would come from authentication)
  const driverId = '789123';
  const driverData = {
    name: 'John Driver',
    rating: 4.8,
    car: 'Toyota Camry',
    plate: 'ABC 123',
    latitude: 37.7849,
    longitude: -122.4294,
    isAvailable: true
  };
  
  // Initialize socket connection
  useEffect(() => {
    console.log('RideRequestsScreen: initializing socket connection');
    if (!socketService.connected) {
      const driverCoordinates = {
        latitude: Number(driverData.latitude), 
        longitude: Number(driverData.longitude),
        isAvailable: driverData.isAvailable
      };
      socketService.initialize(driverId, driverCoordinates);
    }
    
    // Define the ride request handler function
    const handleRideRequest = (rideId, userId, pickup, dropoff) => {
      console.log('New ride request received:', rideId);
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
      
      // Calculate distance and ETA
      const distance = calculateDistance(
        driverData.latitude,
        driverData.longitude,
        pickupCoords.latitude,
        pickupCoords.longitude
      );
      
      const eta = calculateETA(distance);
      
      // Create the new request object
      const newRequest = {
        id: rideId,
        userId,
        pickup,
        dropoff,
        timestamp: new Date(),
        distance,
        distanceText: `${distance.toFixed(1)} mi`,
        eta,
        etaText: `${eta} min`
      };
      
      console.log('Creating new ride request object:', newRequest);
      
      // Show incoming request modal with the new request
      setIncomingRequest(newRequest);
      setIncomingRequestModalVisible(true);
      
      // Play sound or vibration to alert driver
      // (Would be implemented here in a real app)
      
      // Add to ride requests
      setRideRequests(prev => {
        // Check if already exists
        const existingIndex = prev.findIndex(r => r.id === rideId);
        
        if (existingIndex >= 0) {
          // Update existing request
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            pickup,
            dropoff,
            distance,
            eta
          };
          return updated;
        } else {
          // Add new request
          console.log('Adding new ride request to list:', newRequest);
          return [...prev, newRequest];
        }
      });
    };
    
    // Register the handler with both callback naming styles
    socketService.on('onRideRequest', handleRideRequest);
    socketService.on('rideRequest', handleRideRequest);
    
    // Listen for user responses
    const handleAcceptedByUser = (rideId, userId) => {
      console.log('Request accepted by user:', rideId);
      
      // Show acceptance modal
      setCurrentRideId(rideId);
      setResponseType('accepted');
      setResponseModalVisible(true);
      
      // Remove ride from available requests
      setRideRequests(prev => prev.filter(r => r.id !== rideId));
      
      // Navigate to ride details after a delay
      setTimeout(() => {
        setResponseModalVisible(false);
        navigateToRideDetails(rideId, userId);
      }, 2000);
    };
    
    const handleRejectedByUser = (rideId, userId) => {
      console.log('Request rejected by user:', rideId);
      
      // Update request sent status to rejected
      setRequestSent(prev => ({
        ...prev,
        [rideId]: 'rejected'
      }));
      
      // Show rejection modal
      setCurrentRideId(rideId);
      setResponseType('rejected');
      setResponseModalVisible(true);
      
      // Hide modal after delay
      setTimeout(() => {
        setResponseModalVisible(false);
      }, 2000);
    };
    
    // Register the handlers with both callback naming styles
    socketService.on('onAcceptedByUser', handleAcceptedByUser);
    socketService.on('acceptedByUser', handleAcceptedByUser);
    socketService.on('onRejectedByUser', handleRejectedByUser);
    socketService.on('rejectedByUser', handleRejectedByUser);
    
    return () => {
      // Clean up all callback registrations
      socketService.on('onRideRequest', null);
      socketService.on('rideRequest', null);
      socketService.on('onAcceptedByUser', null);
      socketService.on('acceptedByUser', null);
      socketService.on('onRejectedByUser', null);
      socketService.on('rejectedByUser', null);
    };
  }, []);
  
  // Navigate to ride details screen
  const navigateToRideDetails = (rideId, userId) => {
    const ride = rideRequests.find(r => r.id === rideId);
    
    if (ride) {
      navigation.replace('RideInProgressScreen', {
        rideDetails: {
          rideId,
          passengerName: 'Customer', // In a real app, you'd get the name from the backend
          passengerMobile: '+1234567890',
          pickup: ride.pickup.address,
          dropoff: ride.dropoff.address,
          distance: ride.distanceText,
          fareAmount: calculateFare(ride.distance),
          paymentMethod: 'Cash Payment'
        }
      });
    }
  };
  
  // Calculate rough distance in miles
  const calculateDistance = (driverLat, driverLon, userLat, userLon) => {
    if (!driverLat || !driverLon || !userLat || !userLon) {
      console.error('Invalid coordinates for distance calculation', {
        driverLat, driverLon, userLat, userLon
      });
      return 0;
    }
    
    try {
      const R = 3958.8; // Earth's radius in miles
      const lat1 = driverLat * Math.PI / 180;
      const lat2 = userLat * Math.PI / 180;
      const lon1 = driverLon * Math.PI / 180;
      const lon2 = userLon * Math.PI / 180;
      
      const dlon = lon2 - lon1;
      const dlat = lat2 - lat1;
      const a = Math.sin(dlat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)**2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      return distance;
    } catch (error) {
      console.error('Error calculating distance:', error);
      return 0;
    }
  };
  
  // Calculate ETA in minutes (simple approximation)
  const calculateETA = (distanceInMiles, averageSpeedMph = 30) => {
    const timeInHours = distanceInMiles / averageSpeedMph;
    const timeInMinutes = Math.ceil(timeInHours * 60);
    return Math.max(1, timeInMinutes); // Minimum 1 minute
  };
  
  // Calculate fare (simple approximation)
  const calculateFare = (distanceInMiles) => {
    const baseFare = 5;
    const perMileRate = 2;
    return baseFare + (distanceInMiles * perMileRate);
  };
  
  // Handle ride selection
  const handleRideSelect = (ride) => {
    setSelectedRide(ride.id === selectedRide ? null : ride.id);
  };
  
  // Send request to user
  const handleSendRequest = () => {
    if (!selectedRide) return;
    
    const ride = rideRequests.find(r => r.id === selectedRide);
    
    if (ride) {
      setLoading(true);
      
      // Send request through socket
      socketService.sendRideRequest(ride.id, ride.userId);
      
      // Mark as sent
      setRequestSent(prev => ({
        ...prev,
        [ride.id]: 'sent'
      }));
      
      setLoading(false);
    }
  };
  
  // Handle accepting incoming request
  const handleAcceptIncomingRequest = () => {
    if (incomingRequest) {
      setSelectedRide(incomingRequest.id);
      setIncomingRequestModalVisible(false);
    }
  };
  
  // Handle rejecting incoming request
  const handleRejectIncomingRequest = () => {
    setIncomingRequestModalVisible(false);
  };
  
  // Render ride request item
  const renderRideItem = ({ item }) => {
    const isSelected = selectedRide === item.id;
    const requestStatus = requestSent[item.id];
    
    return (
      <TouchableOpacity
        style={[
          styles.rideItem,
          isSelected && styles.selectedRideItem
        ]}
        onPress={() => handleRideSelect(item)}
        disabled={requestStatus === 'sent' || requestStatus === 'rejected'}
      >
        <View style={styles.rideItemHeader}>
          <View style={styles.pickupIndicator}>
            <Ionicons name="location" size={18} color="#FFB800" />
          </View>
          <Text style={styles.rideAddress} numberOfLines={2}>{item.pickup.address || "Pickup Location"}</Text>
        </View>
        
        <View style={styles.rideItemDivider}>
          <View style={styles.dotLine} />
        </View>
        
        <View style={styles.rideItemHeader}>
          <View style={styles.destinationIndicator}>
            <Ionicons name="flag" size={18} color="#FF3B30" />
          </View>
          <Text style={styles.rideAddress} numberOfLines={2}>{item.dropoff.address || "Destination Location"}</Text>
        </View>
        
        <View style={styles.rideDetails}>
          <View style={styles.rideDetail}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.rideDetailText}>{item.etaText}</Text>
          </View>
          
          <View style={styles.rideDetail}>
            <Ionicons name="navigate-outline" size={16} color="#666" />
            <Text style={styles.rideDetailText}>{item.distanceText}</Text>
          </View>
          
          <View style={styles.rideDetail}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.rideDetailText}>${calculateFare(item.distance).toFixed(2)}</Text>
          </View>
        </View>
        
        {requestStatus === 'sent' && (
          <View style={styles.requestSentContainer}>
            <Text style={styles.requestSentText}>Request Sent</Text>
            <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
          </View>
        )}
        
        {requestStatus === 'rejected' && (
          <View style={styles.requestRejectedContainer}>
            <Text style={styles.requestRejectedText}>Request Rejected</Text>
            <Ionicons name="close-circle" size={18} color="#FF3B30" />
          </View>
        )}
        
        {isSelected && !requestStatus && (
          <View style={styles.selectedCheckmark}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Requests</Text>
      </View>
      
      {/* Map (if selected ride) */}
      {selectedRide && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.latitude || 37.78825,
              longitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.longitude || -122.4324,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0121,
            }}
          >
            {/* Driver Marker */}
            <Marker
              coordinate={{
                latitude: driverData.latitude,
                longitude: driverData.longitude
              }}
              title="Your Location"
            >
              <View style={styles.driverMarker}>
                <Ionicons name="car" size={20} color="#555" />
              </View>
            </Marker>
            
            {/* Pickup Marker */}
            {selectedRide && (
              <Marker
                coordinate={{
                  latitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.latitude,
                  longitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.longitude
                }}
                title="Pickup"
              >
                <View style={styles.pickupMarker}>
                  <Ionicons name="location" size={20} color="#FFB800" />
                </View>
              </Marker>
            )}
            
            {/* Destination Marker */}
            {selectedRide && (
              <Marker
                coordinate={{
                  latitude: rideRequests.find(r => r.id === selectedRide)?.dropoff?.coordinates?.latitude,
                  longitude: rideRequests.find(r => r.id === selectedRide)?.dropoff?.coordinates?.longitude
                }}
                title="Destination"
              >
                <View style={styles.destinationMarker}>
                  <Ionicons name="flag" size={20} color="#FF3B30" />
                </View>
              </Marker>
            )}
            
            {/* Route lines */}
            {selectedRide && (
              <>
                <Polyline
                  coordinates={[
                    {
                      latitude: driverData.latitude,
                      longitude: driverData.longitude
                    },
                    {
                      latitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.latitude,
                      longitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.longitude
                    }
                  ]}
                  strokeWidth={3}
                  strokeColor="#555"
                  lineDashPattern={[1]}
                />
                <Polyline
                  coordinates={[
                    {
                      latitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.latitude,
                      longitude: rideRequests.find(r => r.id === selectedRide)?.pickup?.coordinates?.longitude
                    },
                    {
                      latitude: rideRequests.find(r => r.id === selectedRide)?.dropoff?.coordinates?.latitude,
                      longitude: rideRequests.find(r => r.id === selectedRide)?.dropoff?.coordinates?.longitude
                    }
                  ]}
                  strokeWidth={3}
                  strokeColor="#FFB800"
                />
              </>
            )}
          </MapView>
        </View>
      )}
      
      {/* Rides List */}
      <View style={[styles.ridesContainer, !selectedRide && styles.fullHeightContainer]}>
        <Text style={styles.sectionTitle}>
          Available Rides {rideRequests.length > 0 ? `(${rideRequests.length})` : ''}
        </Text>
        
        {rideRequests.length > 0 ? (
          <FlatList
            data={rideRequests}
            renderItem={renderRideItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.ridesList}
          />
        ) : (
          <View style={styles.noRidesContainer}>
            <Ionicons name="car-outline" size={60} color="#ccc" />
            <Text style={styles.noRidesText}>No ride requests available</Text>
            <Text style={styles.noRidesSubtext}>
              New ride requests will appear here when customers request a ride in your area.
            </Text>
          </View>
        )}
      </View>
      
      {/* Send Request Button */}
      {selectedRide && !requestSent[selectedRide] && (
        <TouchableOpacity
          style={styles.sendRequestButton}
          onPress={handleSendRequest}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.sendRequestButtonText}>Send Request to Customer</Text>
          )}
        </TouchableOpacity>
      )}
      
      {/* Response Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={responseModalVisible}
        onRequestClose={() => setResponseModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {responseType === 'accepted' ? (
              <>
                <View style={styles.modalIconContainer}>
                  <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                </View>
                <Text style={styles.modalTitle}>Request Accepted!</Text>
                <Text style={styles.modalText}>
                  The customer has accepted your ride request. Preparing route...
                </Text>
              </>
            ) : (
              <>
                <View style={styles.modalIconContainer}>
                  <Ionicons name="close-circle" size={60} color="#FF3B30" />
                </View>
                <Text style={styles.modalTitle}>Request Rejected</Text>
                <Text style={styles.modalText}>
                  The customer has declined your ride request. You can try other available rides.
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Incoming Ride Request Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={incomingRequestModalVisible}
        onRequestClose={() => setIncomingRequestModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.incomingRequestContainer}>
            <View style={styles.incomingRequestHeader}>
              <Ionicons name="notifications" size={40} color="#FFB800" />
              <Text style={styles.incomingRequestTitle}>New Ride Request!</Text>
            </View>
            
            {incomingRequest && (
              <View style={styles.incomingRequestDetails}>
                <View style={styles.rideItemHeader}>
                  <View style={styles.pickupIndicator}>
                    <Ionicons name="location" size={18} color="#FFB800" />
                  </View>
                  <Text style={styles.rideAddress} numberOfLines={2}>
                    {incomingRequest.pickup.address || "Pickup Location"}
                  </Text>
                </View>
                
                <View style={styles.rideItemDivider}>
                  <View style={styles.dotLine} />
                </View>
                
                <View style={styles.rideItemHeader}>
                  <View style={styles.destinationIndicator}>
                    <Ionicons name="flag" size={18} color="#FF3B30" />
                  </View>
                  <Text style={styles.rideAddress} numberOfLines={2}>
                    {incomingRequest.dropoff.address || "Destination Location"}
                  </Text>
                </View>
                
                <View style={styles.rideDetails}>
                  <View style={styles.rideDetail}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.rideDetailText}>{incomingRequest.etaText}</Text>
                  </View>
                  
                  <View style={styles.rideDetail}>
                    <Ionicons name="navigate-outline" size={16} color="#666" />
                    <Text style={styles.rideDetailText}>{incomingRequest.distanceText}</Text>
                  </View>
                  
                  <View style={styles.rideDetail}>
                    <Ionicons name="cash-outline" size={16} color="#666" />
                    <Text style={styles.rideDetailText}>
                      ${calculateFare(incomingRequest.distance).toFixed(2)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.incomingRequestActions}>
                  <TouchableOpacity 
                    style={styles.rejectButton}
                    onPress={handleRejectIncomingRequest}
                  >
                    <Text style={styles.rejectButtonText}>Decline</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={handleAcceptIncomingRequest}
                  >
                    <Text style={styles.acceptButtonText}>View Request</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    height: 200,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  ridesContainer: {
    flex: 1,
    padding: 16,
  },
  fullHeightContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  ridesList: {
    paddingBottom: 80, // Space for the button
  },
  rideItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedRideItem: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#f0f7f0',
  },
  rideItemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pickupIndicator: {
    width: 30,
    alignItems: 'center',
  },
  destinationIndicator: {
    width: 30,
    alignItems: 'center',
  },
  rideAddress: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  rideItemDivider: {
    marginLeft: 15,
    height: 20,
    marginVertical: 4,
  },
  dotLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#ddd',
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  rideDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideDetailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  selectedCheckmark: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  sendRequestButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendRequestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555',
  },
  pickupMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  destinationMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  noRidesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  noRidesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  noRidesSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  requestSentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  requestSentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 8,
  },
  requestRejectedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  requestRejectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginRight: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalIconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  // Styles for incoming request modal
  incomingRequestContainer: {
    width: '92%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  incomingRequestHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  incomingRequestTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  incomingRequestDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  incomingRequestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  rejectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RideRequestsScreen; 