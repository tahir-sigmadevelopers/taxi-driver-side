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

const AccountScreen = ({ navigation }) => {
  // Mock user data
  const user = {
    name: 'Jenny Wilson',
    profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  // Menu items
  const menuItems = [
    { 
      id: 'profile', 
      title: 'Your Profile', 
      icon: 'person-outline', 
      color: '#FFD600',
      onPress: () => navigation.navigate('ProfileDetailsScreen')
    },
    { 
      id: 'notifications', 
      title: 'Notification', 
      icon: 'notifications-outline', 
      color: '#FFD600',
      onPress: () => console.log('Notifications pressed') 
    },
    { 
      id: 'rides', 
      title: 'Your Rides', 
      icon: 'time-outline', 
      color: '#FFD600',
      onPress: () => console.log('Your Rides pressed') 
    },
    { 
      id: 'prebooked', 
      title: 'Pre-Booked Rides', 
      icon: 'calendar-outline', 
      color: '#FFD600',
      onPress: () => navigation.navigate('PreBookedRidesScreen')
    },
    { 
      id: 'settings', 
      title: 'Settings', 
      icon: 'settings-outline', 
      color: '#FFD600',
      onPress: () => console.log('Settings pressed') 
    },
    { 
      id: 'cars', 
      title: 'Cars', 
      icon: 'car-outline', 
      color: '#FFD600',
      onPress: () => console.log('Cars pressed') 
    },
    { 
      id: 'help', 
      title: 'Help Center', 
      icon: 'information-circle-outline', 
      color: '#FFD600',
      onPress: () => console.log('Help Center pressed') 
    },
    { 
      id: 'privacy', 
      title: 'Privacy Policy', 
      icon: 'document-text-outline', 
      color: '#FFD600',
      onPress: () => console.log('Privacy Policy pressed') 
    },
    { 
      id: 'logout', 
      title: 'Logout', 
      icon: 'log-out-outline', 
      color: '#FFD600',
      onPress: () => console.log('Logout pressed') 
    },
  ];

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
        
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: user.profilePicture }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="pencil" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      
      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color={item.color} style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward" size={24} color="#FFD600" />
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
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // To offset the backButton width for centering
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFD600',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default AccountScreen; 