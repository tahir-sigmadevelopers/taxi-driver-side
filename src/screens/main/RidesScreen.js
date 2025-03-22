import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

// Sample ride data
const sampleRides = [
  {
    id: '1',
    status: 'upcoming',
    passenger: 'John Doe',
    pickupLocation: '123 Main St',
    dropoffLocation: '456 Park Ave',
    date: '15 Sept 2023',
    time: '14:30',
    amount: '$18.50',
    distance: '5.2 miles'
  },
  {
    id: '2',
    status: 'upcoming',
    passenger: 'Alice Smith',
    pickupLocation: '789 Broadway',
    dropoffLocation: '101 Fifth Ave',
    date: '16 Sept 2023',
    time: '09:15',
    amount: '$22.75',
    distance: '6.8 miles'
  },
  {
    id: '3',
    status: 'completed',
    passenger: 'Bob Johnson',
    pickupLocation: '555 Ocean Dr',
    dropoffLocation: 'Airport Terminal',
    date: '14 Sept 2023',
    time: '11:00',
    amount: '$35.20',
    distance: '12.3 miles'
  },
  {
    id: '4',
    status: 'completed',
    passenger: 'Emma Wilson',
    pickupLocation: 'Central Park',
    dropoffLocation: 'Downtown Mall',
    date: '13 Sept 2023',
    time: '16:45',
    amount: '$15.30',
    distance: '4.5 miles'
  },
  {
    id: '5',
    status: 'completed',
    passenger: 'Michael Brown',
    pickupLocation: 'Hotel Plaza',
    dropoffLocation: 'Conference Center',
    date: '12 Sept 2023',
    time: '08:30',
    amount: '$28.90',
    distance: '8.7 miles'
  }
];

const RidesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const filteredRides = sampleRides.filter(ride => ride.status === activeTab);

  const renderRideItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.rideCard}
      onPress={() => navigation.navigate('RideDetails', { rideId: item.id })}
    >
      <View style={styles.rideHeader}>
        <View style={styles.passengerInfo}>
          <Image
            source={require('../../assets/images/user-avatar.png')}
            style={styles.passengerImage}
          />
          <View>
            <Text style={styles.passengerName}>{item.passenger}</Text>
            <Text style={styles.rideDate}>{item.date} • {item.time}</Text>
          </View>
        </View>
        <Text style={styles.rideAmount}>{item.amount}</Text>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationItem}>
          <View style={[styles.locationDot, styles.pickupDot]} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationType}>Pickup</Text>
            <Text style={styles.locationText}>{item.pickupLocation}</Text>
          </View>
        </View>
        
        <View style={styles.locationLine} />
        
        <View style={styles.locationItem}>
          <View style={[styles.locationDot, styles.dropoffDot]} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationType}>Dropoff</Text>
            <Text style={styles.locationText}>{item.dropoffLocation}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <Text style={styles.rideDistance}>{item.distance}</Text>
        <View style={styles.footerRight}>
          {activeTab === 'upcoming' && (
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rides</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'upcoming' && styles.activeTabButton]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'completed' && styles.activeTabButton]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {filteredRides.length > 0 ? (
        <FlatList
          data={filteredRides}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ridesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={80} color="#DDD" />
          <Text style={styles.emptyText}>
            No {activeTab} rides found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFD600',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  ridesList: {
    padding: 16,
  },
  rideCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  rideDate: {
    fontSize: 14,
    color: '#666',
  },
  rideAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
  },
  pickupDot: {
    backgroundColor: '#FFD600',
  },
  dropoffDot: {
    backgroundColor: '#FF3B30',
  },
  locationLine: {
    width: 2,
    height: 25,
    backgroundColor: '#DDD',
    marginLeft: 5,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationType: {
    fontSize: 14,
    color: '#666',
  },
  locationText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rideDistance: {
    fontSize: 14,
    color: '#666',
  },
  footerRight: {
    flexDirection: 'row',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF3B30',
    marginRight: 8,
  },
  cancelText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFD600',
  },
  detailsText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});

export default RidesScreen; 