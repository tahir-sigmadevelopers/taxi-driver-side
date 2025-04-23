import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const Home = () => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState(false);
  const [earnings, setEarnings] = useState(75.50);
  const [rides, setRides] = useState(12);
  const [rating, setRating] = useState(4.85);

  // Navigate to rides history
  const goToRides = () => {
    navigation.navigate('Rides');
  };

  // Toggle driver availability status
  const toggleStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    Alert.alert(
      newStatus ? 'You are now Online' : 'You are now Offline',
      newStatus 
        ? 'You will now receive ride requests' 
        : 'You will not receive any new ride requests',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <View style={styles.statusIndicator}>
            <View 
              style={[
                styles.statusDot, 
                {backgroundColor: isOnline ? COLORS.green : COLORS.red}
              ]} 
            />
            <Text style={styles.statusText}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.toggleButton, 
              {backgroundColor: isOnline ? COLORS.red : COLORS.green}
            ]}
            onPress={toggleStatus}
            accessible={true}
            accessibilityLabel={isOnline ? "Go offline" : "Go online"}
            accessibilityHint={isOnline ? "Tap to stop receiving ride requests" : "Tap to start receiving ride requests"}
          >
            <Text style={styles.toggleButtonText}>
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Summary Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image 
              source={require('../../assets/images/driver-avatar.png')} 
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.driverName}>John Driver</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{rating}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="cash" size={24} color={COLORS.primary} />
            <Text style={styles.statAmount}>${earnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Today's Earnings</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="car" size={24} color={COLORS.primary} />
            <Text style={styles.statAmount}>{rides}</Text>
            <Text style={styles.statLabel}>Completed Rides</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={goToRides}
            accessible={true}
            accessibilityLabel="View ride history"
            accessibilityHint="Navigate to your ride history screen"
          >
            <Icon name="history" size={22} color={COLORS.primary} />
            <Text style={styles.actionText}>Ride History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            accessible={true}
            accessibilityLabel="View earnings"
            accessibilityHint="Navigate to your earnings screen"
          >
            <Icon name="cash-multiple" size={22} color={COLORS.primary} />
            <Text style={styles.actionText}>Earnings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            accessible={true}
            accessibilityLabel="Account settings"
            accessibilityHint="Navigate to your account settings"
          >
            <Icon name="account-cog" size={22} color={COLORS.primary} />
            <Text style={styles.actionText}>Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            accessible={true}
            accessibilityLabel="Help and support"
            accessibilityHint="Navigate to help and support"
          >
            <Icon name="help-circle" size={22} color={COLORS.primary} />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {/* Activity Items */}
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Icon name="car" size={20} color={COLORS.white} />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Downtown Trip</Text>
              <Text style={styles.activityTime}>Today, 2:30 PM</Text>
            </View>
            <Text style={styles.activityAmount}>$12.50</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Icon name="car" size={20} color={COLORS.white} />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Airport Dropoff</Text>
              <Text style={styles.activityTime}>Today, 10:15 AM</Text>
            </View>
            <Text style={styles.activityAmount}>$28.75</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Icon name="cash-plus" size={20} color={COLORS.white} />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Tip Received</Text>
              <Text style={styles.activityTime}>Today, 10:20 AM</Text>
            </View>
            <Text style={styles.activityAmount}>$5.00</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toggleButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  profileCard: {
    margin: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quickActions: {
    margin: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
  },
  recentActivity: {
    margin: 16,
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIconContainer: {
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home; 