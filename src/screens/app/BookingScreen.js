import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const BookingScreen = ({ navigation }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'completed', 'cancelled'
  
  // Mock booking data
  const bookings = {
    active: [
      {
        id: '1',
        passengerName: 'Jenny Wilson',
        passengerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5.0,
        crn: '#854HG23',
        distance: '4.5 Mile',
        duration: '4 Mins',
        ratePerMile: 1.25,
        date: 'Oct 18,2023',
        time: '08:00 AM',
        pickup: '6391 Westheimer RD. San..',
        dropoff: '1901 Thoridgr Cir Sh..',
        carType: 'Sedan'
      }
    ],
    completed: [
      {
        id: '2',
        passengerName: 'Robert Fox',
        passengerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.8,
        crn: '#721FG45',
        distance: '3.2 Mile',
        duration: '8 Mins',
        ratePerMile: 1.25,
        date: 'Oct 17,2023',
        time: '14:30 PM',
        pickup: '6391 Westheimer RD. San..',
        dropoff: '1901 Thoridgr Cir Sh..',
        carType: 'Sedan'
      }
    ],
    cancelled: [
      {
        id: '3',
        passengerName: 'Esther Howard',
        passengerAvatar: 'https://randomuser.me/api/portraits/women/64.jpg',
        rating: 4.5,
        crn: '#532KL89',
        distance: '5.8 Mile',
        duration: '12 Mins',
        ratePerMile: 1.25,
        date: 'Oct 16,2023',
        time: '09:15 AM',
        pickup: '6391 Westheimer RD. San..',
        dropoff: '1901 Thoridgr Cir Sh..',
        carType: 'SUV'
      }
    ]
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle track rider button
  const handleTrackRider = (booking) => {
    console.log('Track rider:', booking.id);
    // Navigate to tracking screen
  };

  // Handle cancel booking
  const handleCancelBooking = (booking) => {
    console.log('Cancel booking:', booking.id);
    // Show cancel confirmation
  };

  // Render a booking card
  const renderBookingCard = (booking) => (
    <View key={booking.id} style={styles.bookingCard}>
      {/* Passenger Info */}
      <View style={styles.passengerContainer}>
        <Image 
          source={{ uri: booking.passengerAvatar }} 
          style={styles.passengerAvatar} 
        />
        <View style={styles.passengerInfo}>
          <Text style={styles.passengerName}>{booking.passengerName}</Text>
          <Text style={styles.crnText}>CRN: {booking.crn}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View>
            <Ionicons name="star" size={24} color="#FFD600" />
          </View>
          <Text style={styles.ratingText}>{booking.rating}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      {/* Ride Stats */}
      <View style={styles.statsContainer}>
        {/* Distance */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <View>
              <Ionicons name="location" size={22} color="#FFD600" />
            </View>
          </View>
          <Text style={styles.statValue}>{booking.distance}</Text>
        </View>
        
        {/* Duration */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <View>
              <Ionicons name="time" size={22} color="#FFD600" />
            </View>
          </View>
          <Text style={styles.statValue}>{booking.duration}</Text>
        </View>
        
        {/* Rate */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <View>
              <Ionicons name="wallet" size={22} color="#FFD600" />
            </View>
          </View>
          <Text style={styles.statValue}>
            ${booking.ratePerMile.toFixed(2)} <Text style={styles.perMileText}>/mile</Text>
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      {/* Date & Time */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date & Time</Text>
        <Text style={styles.detailValue}>
          {booking.date} <Text style={styles.detailValue}>|</Text> {booking.time}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      {/* Pickup Location */}
      <View style={styles.locationContainer}>
        <View style={styles.pickupDot} />
        <Text style={styles.locationText}>{booking.pickup}</Text>
      </View>
      
      {/* Route Line */}
      <View style={styles.routeLineContainer}>
        <View style={styles.routeLine} />
      </View>
      
      {/* Dropoff Location */}
      <View style={styles.locationContainer}>
        <View style={styles.dropoffDot} />
        <Text style={styles.locationText}>{booking.dropoff}</Text>
      </View>
      
      <View style={styles.divider} />
      
      {/* Car Type */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Booking Car Type</Text>
        <Text style={styles.detailValue}>{booking.carType}</Text>
      </View>
      
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <View style={styles.mapFallback}>
          <View style={styles.mapPinOrigin} />
          <View style={styles.mapRoute} />
          <View style={styles.mapPinDestination} />
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {activeTab === 'active' && (
          <>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelBooking(booking)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => handleTrackRider(booking)}
            >
              <Text style={styles.trackButtonText}>Track Rider</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      
      {/* Expand/Collapse Button */}
      <TouchableOpacity style={styles.expandButton}>
        <View>
          <Ionicons name="chevron-down" size={24} color="#000000" />
        </View>
      </TouchableOpacity>
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
          <View>
            <Ionicons name="chevron-back" size={24} color="black" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Booking</Text>
        
        <View style={{ width: 40 }} /> {/* Empty view for balance */}
      </View>
      
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'active' && styles.activeTabItem
          ]}
          onPress={() => handleTabChange('active')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'active' && styles.activeTabText
          ]}>Active</Text>
          {activeTab === 'active' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'completed' && styles.activeTabItem
          ]}
          onPress={() => handleTabChange('completed')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'completed' && styles.activeTabText
          ]}>Completed</Text>
          {activeTab === 'completed' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'cancelled' && styles.activeTabItem
          ]}
          onPress={() => handleTabChange('cancelled')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'cancelled' && styles.activeTabText
          ]}>Cancelled</Text>
          {activeTab === 'cancelled' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
      
      {/* Booking Cards */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {bookings[activeTab].map(booking => renderBookingCard(booking))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
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
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeTabItem: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 16,
    color: '#888888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFD600',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FFD600',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passengerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  crnText: {
    fontSize: 16,
    color: '#888888',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    marginRight: 8,
  },
  statValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  perMileText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: 'normal',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#888888',
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  pickupDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000000',
    marginRight: 15,
  },
  dropoffDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD600',
    marginRight: 15,
  },
  locationText: {
    fontSize: 16,
    color: '#000000',
  },
  routeLineContainer: {
    marginLeft: 10,
    height: 25,
  },
  routeLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#CCCCCC',
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 15,
  },
  mapFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E6EEF5',
    position: 'relative',
  },
  mapPinOrigin: {
    position: 'absolute',
    top: '30%',
    left: '25%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD600',
  },
  mapPinDestination: {
    position: 'absolute',
    bottom: '30%',
    right: '25%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD600',
  },
  mapRoute: {
    position: 'absolute',
    top: '35%',
    left: '30%',
    width: '45%',
    height: 3,
    backgroundColor: '#000000',
    transform: [{ rotate: '25deg' }],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  trackButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD600',
    borderRadius: 25,
    marginLeft: 10,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  expandButton: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default BookingScreen; 