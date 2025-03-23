import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const CashCollectionScreen = ({ navigation, route }) => {
  const [cashCollected, setCashCollected] = useState(false);
  
  const { rideDetails } = route.params || {
    passengerName: 'Esther Howard',
    paymentMethod: 'Cash Payment',
    pickup: '6391 Elgin St. Celina, Delaware 10299',
    dropoff: '1901 Thoridgr Cir Sh...',
    distance: '16 miles',
    otpCode: '7854',
    fareAmount: 12.5,
  };

  // Handle cash collected button press
  const handleCashCollected = () => {
    setCashCollected(true);
    
    // Show animation or message if needed
    
    // Navigate to rate rider screen after a short delay
    setTimeout(() => {
      navigation.navigate('RateRiderScreen', { 
        rideDetails: {
          passengerName: rideDetails.passengerName,
          fareAmount: rideDetails.fareAmount,
          distance: rideDetails.distance
        }
      });
    }, 1000);
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
        
        <Text style={styles.headerTitle}>Collect Cash</Text>
      </View>
      
      <View style={styles.scrollableContent}>
        {/* Main Content Card */}
        <View style={styles.cardContainer}>
          {/* Wallet Icon */}
          <View style={styles.walletIconContainer}>
            <Ionicons name="wallet-outline" size={48} color="#FFD600" />
          </View>
          
          {/* Card Title */}
          <Text style={styles.cardTitle}>Collect Cash</Text>
          
          {/* Route Information */}
          <View style={styles.routeContainer}>
            {/* Pickup Point */}
            <View style={styles.routePoint}>
              <View style={styles.pickupDot} />
              <Text style={styles.routeAddress} numberOfLines={1}>
                {rideDetails.pickup}
              </Text>
            </View>
            
            {/* Distance Line */}
            <View style={styles.distanceLine}>
              <View style={styles.dottedLine} />
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>{rideDetails.distance}</Text>
              </View>
            </View>
            
            {/* Dropoff Point */}
            <View style={styles.routePoint}>
              <View style={styles.destinationDot} />
              <Text style={styles.routeAddress} numberOfLines={1}>
                {rideDetails.dropoff}
              </Text>
            </View>
          </View>
          
          {/* OTP Code */}
          <View style={styles.otpContainer}>
            <Text style={styles.otpText}>OTP - {rideDetails.otpCode}</Text>
          </View>
          
          {/* Passenger Info */}
          <View style={styles.passengerContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.passengerImage} 
            />
            <View style={styles.passengerDetails}>
              <Text style={styles.passengerName}>{rideDetails.passengerName}</Text>
              <Text style={styles.paymentMethod}>{rideDetails.paymentMethod}</Text>
            </View>
          </View>
          
          {/* Total Amount */}
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmountLabel}>Total Amount</Text>
            <Text style={styles.totalAmountValue}>${rideDetails.fareAmount}</Text>
          </View>
        </View>
      </View>
      
      {/* Cash Collected Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.cashCollectedButton, cashCollected && styles.cashCollectedButtonDisabled]} 
          onPress={handleCashCollected}
          disabled={cashCollected}
        >
          <Text style={styles.cashCollectedButtonText}>
            {cashCollected ? 'Cash Collected ✓' : 'Cash Collected'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 10 : 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
    marginBottom: 5,
  },
  scrollableContent: {
    flex: 1,
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
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 20,
  },
  cardContainer: {
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  walletIconContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 25,
  },
  routeContainer: {
    marginBottom: 15,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  pickupDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000000',
    marginRight: 12,
  },
  destinationDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD600',
    marginRight: 12,
  },
  routeAddress: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  distanceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    height: 25,
  },
  dottedLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#CCCCCC',
    marginLeft: 9,
  },
  distanceBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 20,
  },
  distanceText: {
    fontSize: 14,
    color: '#666666',
  },
  otpContainer: {
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 15,
  },
  otpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  passengerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 16,
    color: '#666666',
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFD600',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  totalAmountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalAmountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 5 : 10,
  },
  cashCollectedButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cashCollectedButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  cashCollectedButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CashCollectionScreen; 