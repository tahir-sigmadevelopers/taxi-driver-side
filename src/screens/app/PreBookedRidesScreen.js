import React from 'react';
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

const PreBookedRidesScreen = ({ navigation }) => {
  // Mock pre-booked rides data
  const preBookedRides = [
    {
      id: '1',
      passengerName: 'Robert Fox',
      passengerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      crn: '#854HG23',
      distance: '4.5 Mile',
      duration: '4 Mins',
      ratePerMile: 1.25,
      date: 'Oct 18,2023',
      time: '08:00 AM',
      pickup: '6391 Westheimer RD. San..',
      dropoff: '1901 Thoridgr Cir Sh..',
      carType: 'Sedan'
    },
    {
      id: '2',
      passengerName: 'Jenny Wilson',
      passengerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
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
  ];

  // Render a single pre-booked ride card
  const renderRideCard = (ride) => (
    <View key={ride.id} style={styles.rideCard}>
      {/* Passenger Info */}
      <View style={styles.passengerContainer}>
        <Image 
          source={{ uri: ride.passengerAvatar }} 
          style={styles.passengerAvatar} 
        />
        <View style={styles.passengerInfo}>
          <Text style={styles.passengerName}>{ride.passengerName}</Text>
          <Text style={styles.crnText}>CRN: {ride.crn}</Text>
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
          <Text style={styles.statValue}>{ride.distance}</Text>
        </View>
        
        {/* Duration */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <View>
              <Ionicons name="time" size={22} color="#FFD600" />
            </View>
          </View>
          <Text style={styles.statValue}>{ride.duration}</Text>
        </View>
        
        {/* Rate */}
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <View>
              <Ionicons name="wallet" size={22} color="#FFD600" />
            </View>
          </View>
          <Text style={styles.statValue}>
            ${ride.ratePerMile.toFixed(2)} <Text style={styles.perMileText}>/mile</Text>
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      {/* Date & Time */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date & Time</Text>
        <Text style={styles.detailValue}>
          {ride.date} <Text style={styles.detailValue}>|</Text> {ride.time}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      {/* Pickup Location */}
      <View style={styles.locationContainer}>
        <View style={styles.pickupDot} />
        <Text style={styles.locationText}>{ride.pickup}</Text>
      </View>
      
      {/* Route Line */}
      <View style={styles.routeLineContainer}>
        <View style={styles.routeLine} />
      </View>
      
      {/* Dropoff Location */}
      <View style={styles.locationContainer}>
        <View style={styles.dropoffDot} />
        <Text style={styles.locationText}>{ride.dropoff}</Text>
      </View>
      
      <View style={styles.divider} />
      
      {/* Car Type */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Booking Car Type</Text>
        <Text style={styles.detailValue}>{ride.carType}</Text>
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
        
        <Text style={styles.headerTitle}>Pre-Booked Rides</Text>
        
        <View style={{ width: 40 }} /> {/* Empty view for balance */}
      </View>
      
      {/* Ride Cards */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {preBookedRides.map(ride => renderRideCard(ride))}
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  rideCard: {
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
  expandButton: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default PreBookedRidesScreen; 