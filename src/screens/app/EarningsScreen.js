import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const EarningsScreen = ({ navigation }) => {
  // Mock earning data
  const earningsSummary = {
    totalHours: '01',
    totalMiles: '80',
    totalEarnings: 100
  };

  // Mock trip history data
  const tripHistory = [
    {
      id: '1',
      passengerName: 'Carla Schoen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      distance: '4.5 Miles',
      time: '10 Mins',
      amount: 58.00
    },
    {
      id: '2',
      passengerName: 'CArla Schoem',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      distance: '4.5 Miles',
      time: '10 Mins',
      amount: 58.00
    },
    {
      id: '3',
      passengerName: 'Esther Howard',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      distance: '4.5 Miles',
      time: '10 Mins',
      amount: 58.00
    },
    {
      id: '4',
      passengerName: 'Robert Fox',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      distance: '4.5 Miles',
      time: '10 Mins',
      amount: 58.00
    },
    {
      id: '5',
      passengerName: 'Esther Howard',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      distance: '4.5 Miles',
      time: '10 Mins',
      amount: 58.00
    },
    {
      id: '6',
      passengerName: 'Ralph Edwards',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      distance: '4.5 Miles',
      time: '10 Mins',
      amount: 58.00
    }
  ];

  // Render trip item
  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <View style={styles.tripHeader}>
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.passengerAvatar} 
        />
        <View style={styles.tripDetails}>
          <Text style={styles.passengerName}>{item.passengerName}</Text>
          <View style={styles.tripInfo}>
            <Text style={styles.tripInfoText}>{item.distance}</Text>
            <Text style={styles.tripSeparator}>|</Text>
            <Text style={styles.tripInfoText}>{item.time}</Text>
            <Text style={styles.tripSeparator}>|</Text>
            <Text style={styles.tripInfoText}>${item.amount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.tripDivider} />
    </View>
  );

  // Handle submit
  const handleSubmit = () => {
    console.log('Submit pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Today earned</Text>
        
        <TouchableOpacity style={styles.calculatorButton}>
          <Ionicons name="calculator" size={24} color="#FFD600" />
        </TouchableOpacity>
      </View>
      
      {/* Earnings Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Hour</Text>
          <Text style={styles.summaryValue}>{earningsSummary.totalHours}</Text>
        </View>
        
        <View style={styles.summaryDivider} />
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Miles</Text>
          <Text style={styles.summaryValue}>{earningsSummary.totalMiles}</Text>
        </View>
        
        <View style={styles.summaryDivider} />
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
          <Text style={styles.summaryValue}>${earningsSummary.totalEarnings}</Text>
        </View>
      </View>
      
      {/* Trip History */}
      <View style={styles.tripsContainer}>
        <FlatList
          data={tripHistory}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
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
  calculatorButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#212121',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD600',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  tripsContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  tripItem: {
    marginBottom: 15,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  tripDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripInfoText: {
    fontSize: 14,
    color: '#666666',
  },
  tripSeparator: {
    marginHorizontal: 8,
    color: '#666666',
  },
  tripDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 15,
  },
  submitButtonContainer: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#FFD600',
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EarningsScreen; 