import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
  Linking
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import * as Location from 'expo-location';
import { AuthContext } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationPermissionScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  
  // Access AuthContext
  const authContext = useContext(AuthContext);
  
  // Extract params
  const email = route.params?.email || 'User';

  // Check current permission status on component mount
  useEffect(() => {
    checkLocationPermission();
  }, []);

  // Function to check the current location permission status
  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      console.log('Current location permission status:', status);
      setPermissionStatus(status);
      
      // If permissions are already granted, we can show that in the UI
      if (status === 'granted') {
        Alert.alert(
          "Permission Already Granted",
          "Location permission is already granted. You can proceed to the app.",
          [
            { text: "Continue", onPress: () => handleContinueToApp(true) }
          ]
        );
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  // Handle requesting location permission
  const handleAllowLocation = async () => {
    setLoading(true);
    try {
      // Request foreground location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      
      if (status === 'granted') {
        // Test getting the location once to make sure it works
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        
        // Navigate to main app with location permissions granted
        handleContinueToApp(true);
      } else {
        // Permission was denied
        Alert.alert(
          "Permission Denied",
          "Location permission is required for optimal experience. You can change this in your device settings.",
          [
            { text: "Settings", onPress: openLocationSettings },
            { text: "Continue Anyway", onPress: () => handleContinueToApp(false) }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      Alert.alert(
        "Error",
        "There was an error requesting location permissions. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  // Open device settings to enable location permissions
  const openLocationSettings = () => {
    // We cannot directly open settings on all platforms, but we can try
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  // Navigate to main app
  const handleContinueToApp = async (locationPermissionGranted = false) => {
    console.log('Continuing to main app with location permission:', locationPermissionGranted);
    
    try {
      // Store location permission status in AsyncStorage for use throughout the app
      await AsyncStorage.setItem('locationPermissionGranted', JSON.stringify(locationPermissionGranted));
      
      // Use the AuthContext to sign in directly
      if (authContext && authContext.signIn) {
        console.log('Signing in via AuthContext...');
        authContext.signIn();
      } else {
        console.error('AuthContext not available');
        Alert.alert(
          "Error",
          "Unable to continue to the main app. Please restart the application.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error('Error saving permission status:', error);
      
      // Continue anyway
      if (authContext && authContext.signIn) {
        authContext.signIn();
      }
    }
  };

  // Handle "Maybe Later" option
  const handleMaybeLater = () => {
    // Show explanation about the importance of location
    Alert.alert(
      "Location Access Important",
      "Without location access, some features may not work properly. You can enable location access later in app settings.",
      [
        { text: "Enable Now", onPress: handleAllowLocation },
        { text: "Continue Anyway", onPress: () => handleContinueToApp(false) }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={50} color="#FFD600" />
        </View>
        
        <Text style={styles.title}>Enable Location Access</Text>
        
        <Text style={styles.description}>
          To ensure a seamless experience, we need access to your location. This helps us provide better 
          service by finding the closest rides, estimating arrival times accurately, and ensuring safety.
        </Text>
        
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Ionicons name="navigate-circle-outline" size={24} color="#FFD600" />
            <Text style={styles.benefitText}>Find the closest rides nearby</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Ionicons name="time-outline" size={24} color="#FFD600" />
            <Text style={styles.benefitText}>Get accurate arrival time estimates</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#FFD600" />
            <Text style={styles.benefitText}>Enhanced safety features</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.allowButton}
          onPress={handleAllowLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text  style={styles.allowButtonText}>Allow Location Access</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.laterButton}
          onPress={handleMaybeLater}
          disabled={loading}
        >
          <Text style={styles.laterButtonText}>Maybe Later</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  benefitsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  allowButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 45,
  },
  allowButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  laterButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  laterButtonText: {
    color: '#FFD600',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LocationPermissionScreen; 