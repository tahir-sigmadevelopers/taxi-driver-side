import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const HomeScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);

  const toggleSwitch = () => {
    setIsOnline(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={require('../../assets/images/profileImage/profileUser.png')}
              style={styles.profileImage}
            />
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.driverName}>Esther Howard</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={26} color="#000" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Online/Offline Toggle */}
        <View style={styles.statusCard}>
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>You're {isOnline ? 'Online' : 'Offline'}</Text>
            <Text style={styles.statusDescription}>
              {isOnline 
                ? 'You can receive ride requests' 
                : 'You need to be online to receive ride requests'}
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#DDDDDD', true: '#FFD600' }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#DDDDDD"
            onValueChange={toggleSwitch}
            value={isOnline}
            style={styles.switch}
          />
        </View>

        {/* Ride Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$152.35</Text>
            <Text style={styles.statLabel}>Today's Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Today's Trips</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="wallet-outline" size={24} color="#000" />
            </View>
            <Text style={styles.actionText}>Payments</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="car-outline" size={24} color="#000" />
            </View>
            <Text style={styles.actionText}>My Rides</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="help-circle-outline" size={24} color="#000" />
            </View>
            <Text style={styles.actionText}>Support</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Items - Could map through real data */}
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="car" size={22} color="#000" />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Ride to Downtown</Text>
              <Text style={styles.activityTime}>Today, 10:45 AM</Text>
            </View>
            <Text style={styles.activityAmount}>$18.50</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="car" size={22} color="#000" />
            </View>
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>Ride to Airport</Text>
              <Text style={styles.activityTime}>Today, 08:30 AM</Text>
            </View>
            <Text style={styles.activityAmount}>$32.75</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    top: 12,
    right: 12,
  },
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '30%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    width: '30%',
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#000',
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    fontSize: 14,
    color: '#FFD600',
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen; 