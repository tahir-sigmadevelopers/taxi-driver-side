import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  Platform,
  Switch
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const SettingsScreen = ({ navigation }) => {
  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    locationServices: true,
    darkMode: false,
    soundEffects: true,
    autoAccept: false,
    saveRideHistory: true,
    shareLocation: true,
    receivePromotions: false
  });

  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  // Setting categories and items
  const settingCategories = [
    {
      title: 'App Settings',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          description: 'Receive notifications about new ride requests',
          icon: 'notifications-outline',
          value: settings.notifications,
          onToggle: () => toggleSetting('notifications')
        },
        {
          id: 'locationServices',
          title: 'Location Services',
          description: 'Enable location services for accurate pickup',
          icon: 'location-outline',
          value: settings.locationServices,
          onToggle: () => toggleSetting('locationServices')
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          description: 'Enable dark mode for night time driving',
          icon: 'moon-outline',
          value: settings.darkMode,
          onToggle: () => toggleSetting('darkMode')
        },
        {
          id: 'soundEffects',
          title: 'Sound Effects',
          description: 'Play sounds for ride alerts and notifications',
          icon: 'volume-high-outline',
          value: settings.soundEffects,
          onToggle: () => toggleSetting('soundEffects')
        }
      ]
    },
    {
      title: 'Ride Preferences',
      items: [
        {
          id: 'autoAccept',
          title: 'Auto Accept Rides',
          description: 'Automatically accept ride requests',
          icon: 'checkmark-circle-outline',
          value: settings.autoAccept,
          onToggle: () => toggleSetting('autoAccept')
        },
        {
          id: 'saveRideHistory',
          title: 'Save Ride History',
          description: 'Keep record of your past rides',
          icon: 'time-outline',
          value: settings.saveRideHistory,
          onToggle: () => toggleSetting('saveRideHistory')
        }
      ]
    },
    {
      title: 'Privacy Settings',
      items: [
        {
          id: 'shareLocation',
          title: 'Share Location',
          description: 'Share your location with passengers',
          icon: 'navigate-outline',
          value: settings.shareLocation,
          onToggle: () => toggleSetting('shareLocation')
        },
        {
          id: 'receivePromotions',
          title: 'Receive Promotions',
          description: 'Get promotional offers and discounts',
          icon: 'gift-outline',
          value: settings.receivePromotions,
          onToggle: () => toggleSetting('receivePromotions')
        }
      ]
    }
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
        
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      {/* Settings Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {settingCategories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            
            {category.items.map((item) => (
              <View key={item.id} style={styles.settingItem}>
                <View style={styles.settingItemLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={item.icon} size={22} color="#FFD600" />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                </View>
                <Switch
                  trackColor={{ false: "#E0E0E0", true: "#FFD600" }}
                  thumbColor={"#FFFFFF"}
                  ios_backgroundColor="#E0E0E0"
                  onValueChange={item.onToggle}
                  value={item.value}
                />
              </View>
            ))}
          </View>
        ))}
        
        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>App Version: 1.0.0</Text>
        </View>
        
        {/* Bottom padding for scroll */}
        <View style={styles.bottomPadding} />
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    marginTop: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666666',
  },
  versionContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#999999',
  },
  bottomPadding: {
    height: 40,
  },
});

export default SettingsScreen; 