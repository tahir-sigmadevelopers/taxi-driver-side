import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  StatusBar, 
  Platform,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { AuthContext } from '../../../App';

const AccountScreen = ({ navigation }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  // Safely access the AuthContext with error handling
  let authContext;
  try {
    authContext = useContext(AuthContext);
  } catch (error) {
    console.error('Error accessing AuthContext:', error);
    authContext = { signOut: null };
  }

  // Mock user data
  const user = {
    name: 'Jenny Wilson',
    profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out - handleLogout triggered');
    setLogoutModalVisible(false);
    
    try {
      console.log('AuthContext available:', !!authContext);
      console.log('signOut method available:', !!(authContext && authContext.signOut));
      
      // Use Auth Context to sign out if available
      if (authContext && authContext.signOut) {
        console.log('Calling authContext.signOut()');
        authContext.signOut();
      } else {
        console.log('No authContext.signOut available, using navigation fallback');
        // Fallback: Reset navigation to Auth stack
        console.log('Navigation reset to Auth');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Error', 'There was a problem logging out. Please try again.');
    }
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
      onPress: () => navigation.navigate('NotificationScreen') 
    },
    { 
      id: 'rides', 
      title: 'Your Rides', 
      icon: 'time-outline', 
      color: '#FFD600',
      onPress: () => navigation.navigate('Booking')
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
      onPress: () => navigation.navigate('SettingsScreen') 
    },
    { 
      id: 'cars', 
      title: 'Cars', 
      icon: 'car-outline', 
      color: '#FFD600',
      onPress: () => navigation.navigate('CarsScreen') 
    },
    { 
      id: 'help', 
      title: 'Help Center', 
      icon: 'information-circle-outline', 
      color: '#FFD600',
      onPress: () => navigation.navigate('HelpCenterScreen') 
    },
    { 
      id: 'privacy', 
      title: 'Privacy Policy', 
      icon: 'document-text-outline', 
      color: '#FFD600',
      onPress: () => navigation.navigate('PrivacyPolicyScreen') 
    },
    { 
      id: 'logout', 
      title: 'Logout', 
      icon: 'log-out-outline', 
      color: '#FFD600',
      onPress: () => setLogoutModalVisible(true) 
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

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
            
            <Text style={styles.modalTitle}>Logout</Text>
            
            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  cancelButton: {
    flex: 1,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    marginLeft: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  logoutButton: {
    flex: 1,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD600',
    marginLeft: 10,
    marginRight: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default AccountScreen; 