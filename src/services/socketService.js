import { Alert } from 'react-native';
import { SOCKET_URL } from '../config';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.driverId = null;
    this.callbacks = {};
  }

  // Initialize the socket connection
  initialize(driverId, position = null) {
    if (this.socket) {
      this.disconnect();
    }

    this.driverId = driverId;
    
    try {
      this.socket = new WebSocket(SOCKET_URL);
      
      this.socket.onopen = () => {
        console.log('Socket connected');
        this.connected = true;
        
        // Send initial connection message with driver location if available
        this.sendMessage({
          type: 'connect',
          role: 'driver',
          driverId: this.driverId,
          data: position ? {
            latitude: position.latitude,
            longitude: position.longitude,
            isAvailable: true
          } : undefined
        });
        
        if (this.callbacks.onConnect) {
          this.callbacks.onConnect();
        }
      };
      
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Socket received message:', data.type, data);
          
          // Handle different message types
          switch (data.type) {
            case 'rideRequest':
              console.log('Ride request received (full data):', data);
              
              // Validate required fields
              if (!data.rideId || !data.userId) {
                console.error('Missing required fields in ride request:', data);
                break;
              }
              
              // Extract and validate pickup coordinates
              if (!data.pickup || !data.pickup.coordinates) {
                console.error('Missing or invalid pickup coordinates in ride request:', data.pickup);
                break;
              }
              
              // Extract and validate dropoff coordinates
              if (!data.dropoff || !data.dropoff.coordinates) {
                console.error('Missing or invalid dropoff coordinates in ride request:', data.dropoff);
                break;
              }
              
              // Call callbacks if registered
              if (this.callbacks.onRideRequest) {
                this.callbacks.onRideRequest(data.rideId, data.userId, data.pickup, data.dropoff);
              }
              if (this.callbacks.rideRequest) {
                this.callbacks.rideRequest(data.rideId, data.userId, data.pickup, data.dropoff);
              }
              break;
              
            case 'acceptedByUser':
              if (this.callbacks.onAcceptedByUser) {
                this.callbacks.onAcceptedByUser(data.rideId, data.userId);
              }
              if (this.callbacks.acceptedByUser) {
                this.callbacks.acceptedByUser(data.rideId, data.userId);
              }
              break;
              
            case 'rejectedByUser':
              if (this.callbacks.onRejectedByUser) {
                this.callbacks.onRejectedByUser(data.rideId, data.userId);
              }
              if (this.callbacks.rejectedByUser) {
                this.callbacks.rejectedByUser(data.rideId, data.userId);
              }
              break;
              
            case 'rideCancelled':
              if (this.callbacks.onRideCancelled) {
                this.callbacks.onRideCancelled(data.rideId, data.cancelledBy);
              }
              if (this.callbacks.rideCancelled) {
                this.callbacks.rideCancelled(data.rideId, data.cancelledBy);
              }
              break;
              
            case 'userLocation':
              if (this.callbacks.onUserLocation) {
                this.callbacks.onUserLocation(data.userId, data.location, data.rideId);
              }
              if (this.callbacks.userLocation) {
                this.callbacks.userLocation(data.userId, data.location, data.rideId);
              }
              break;
              
            case 'error':
              console.error('Socket error:', data.message);
              if (this.callbacks.onError) {
                this.callbacks.onError(data.message);
              }
              if (this.callbacks.error) {
                this.callbacks.error(data.message);
              }
              break;
              
            case 'connectionStatus':
              console.log('Connection status:', data.status);
              break;
              
            // Explicitly handle other message types
            default:
              console.log(`Unhandled message type: ${data.type}`);
              break;
          }
        } catch (error) {
          console.error('Error parsing socket message:', error);
        }
      };
      
      this.socket.onerror = (error) => {
        console.error('Socket error:', error);
        if (this.callbacks.onError) {
          this.callbacks.onError('Socket connection error');
        }
      };
      
      this.socket.onclose = () => {
        console.log('Socket disconnected');
        this.connected = false;
        if (this.callbacks.onDisconnect) {
          this.callbacks.onDisconnect();
        }
      };
      
      return true;
    } catch (error) {
      console.error('Failed to initialize socket:', error);
      return false;
    }
  }
  
  // Set callback functions
  on(event, callback) {
    this.callbacks[event] = callback;
  }
  
  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.connected = false;
    }
  }
  
  // Send message through socket
  sendMessage(data) {
    if (this.socket && this.connected) {
      try {
        this.socket.send(JSON.stringify(data));
        return true;
      } catch (error) {
        console.error('Error sending socket message:', error);
        return false;
      }
    } else {
      console.warn('Socket not connected, cannot send message');
      return false;
    }
  }
  
  // Update driver location
  updateLocation(position, isAvailable = true) {
    return this.sendMessage({
      type: 'locationUpdate',
      role: 'driver',
      driverId: this.driverId,
      data: {
        latitude: position.latitude,
        longitude: position.longitude,
        isAvailable
      }
    });
  }
  
  // Make ride request to the user
  sendRideRequest(rideId, userId) {
    return this.sendMessage({
      type: 'sendRideRequest',
      role: 'driver',
      driverId: this.driverId,
      rideId,
      userId
    });
  }
  
  // Accept a ride request
  acceptRide(rideId, userId) {
    return this.sendMessage({
      type: 'acceptRide',
      role: 'driver',
      driverId: this.driverId,
      rideId,
      userId
    });
  }
  
  // Reject a ride request
  rejectRide(rideId, userId) {
    return this.sendMessage({
      type: 'rejectRide',
      role: 'driver',
      driverId: this.driverId,
      rideId,
      userId
    });
  }
  
  // Cancel a ride
  cancelRide(rideId, userId) {
    return this.sendMessage({
      type: 'cancelRide',
      role: 'driver',
      driverId: this.driverId,
      rideId,
      userId
    });
  }
  
  // Start a ride
  startRide(rideId, userId) {
    return this.sendMessage({
      type: 'startRide',
      role: 'driver',
      driverId: this.driverId,
      rideId,
      userId
    });
  }
  
  // Complete a ride
  completeRide(rideId, userId) {
    return this.sendMessage({
      type: 'completeRide',
      role: 'driver',
      driverId: this.driverId,
      rideId,
      userId
    });
  }
}

// Create singleton instance
const socketService = new SocketService();
export default socketService; 