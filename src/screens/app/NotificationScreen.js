import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const NotificationScreen = ({ navigation }) => {
  // State for notifications
  const [notifications, setNotifications] = useState({
    today: [
      {
        id: '1',
        type: 'booking',
        title: 'Ride Booked Successfully',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1h',
        read: false
      },
      {
        id: '2',
        type: 'promo',
        title: '50% Off on First Ride',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1h',
        read: false
      }
    ],
    yesterday: [
      {
        id: '3',
        type: 'booking',
        title: 'Ride Booked Successfully',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        read: true
      },
      {
        id: '4',
        type: 'promo',
        title: '50% Off on First Ride',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        read: true
      },
      {
        id: '5',
        type: 'booking',
        title: 'Ride Booked Successfully',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        read: true
      },
      {
        id: '6',
        type: 'promo',
        title: '50% Off on First Ride',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        read: true
      },
      {
        id: '7',
        type: 'booking',
        title: 'Ride Booked Successfully',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        read: true
      },
      {
        id: '8',
        type: 'promo',
        title: '50% Off on First Ride',
        message: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        read: true
      }
    ]
  });

  // Count unread notifications
  const unreadCount = [...notifications.today, ...notifications.yesterday].filter(n => !n.read).length;

  // Mark all notifications as read for a section
  const markAllAsRead = (section) => {
    setNotifications(prev => {
      const updated = {...prev};
      updated[section] = updated[section].map(notification => ({
        ...notification,
        read: true
      }));
      return updated;
    });
  };

  // Handle notification press
  const handleNotificationPress = (notification) => {
    // Mark individual notification as read
    setNotifications(prev => {
      const updated = {...prev};
      
      // Find the section (today or yesterday)
      Object.keys(updated).forEach(section => {
        updated[section] = updated[section].map(item => 
          item.id === notification.id ? {...item, read: true} : item
        );
      });
      
      return updated;
    });
    
    // Navigate based on notification type
    if (notification.type === 'booking') {
      // Navigate to booking details
      navigation.navigate('Booking');
    } else if (notification.type === 'promo') {
      // Navigate to promotions or show promo details
      // navigation.navigate('Promotions');
    }
  };

  // Render notification icon based on type
  const renderNotificationIcon = (type) => {
    if (type === 'booking') {
      return (
        <View style={[styles.iconContainer, styles.bookingIcon]}>
          <Ionicons name="calendar" size={24} color="#FFD600" />
        </View>
      );
    } else if (type === 'promo') {
      return (
        <View style={[styles.iconContainer, styles.promoIcon]}>
          <Ionicons name="ticket" size={24} color="#FFD600" />
        </View>
      );
    }
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
          <View>
            <Ionicons name="chevron-back" size={24} color="black" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Notification</Text>
        
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>{unreadCount} NEW</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Today's Notifications */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TODAY</Text>
          <TouchableOpacity onPress={() => markAllAsRead('today')}>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
        
        {notifications.today.map(notification => (
          <TouchableOpacity 
            key={notification.id}
            style={styles.notificationItem}
            onPress={() => handleNotificationPress(notification)}
          >
            {renderNotificationIcon(notification.type)}
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Yesterday's Notifications */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>YESTERDAY</Text>
          <TouchableOpacity onPress={() => markAllAsRead('yesterday')}>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
        
        {notifications.yesterday.map(notification => (
          <TouchableOpacity 
            key={notification.id}
            style={styles.notificationItem}
            onPress={() => handleNotificationPress(notification)}
          >
            {renderNotificationIcon(notification.type)}
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  newBadge: {
    backgroundColor: '#FFD600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newBadgeText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888888',
  },
  markReadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFD600',
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#FFFADD',
  },
  bookingIcon: {
    // Additional styling for booking icon if needed
  },
  promoIcon: {
    // Additional styling for promo icon if needed
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  notificationTime: {
    fontSize: 14,
    color: '#888888',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 5,
  },
});

export default NotificationScreen; 