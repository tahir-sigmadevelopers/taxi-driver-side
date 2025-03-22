import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { CommonActions } from '@react-navigation/native';

const LocationPermissionScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleAllowLocation = async () => {
    setLoading(true);
    try {
      // Here you would typically request location permissions
      // For example: await Location.requestPermissionsAsync();
      
      // For this demo, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to main app with location permissions granted
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }]
      });
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const handleMaybeLater = () => {
    // Navigate to main app without location permissions
    navigation.reset({
      index: 0,
      routes: [{ 
        name: 'Main',
        params: { locationPermissionGranted: false }
      }]
    });
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
          To ensure a seamless and efficient experience, allow us access to your location.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.allowButton}
          onPress={handleAllowLocation}
          disabled={loading}
        >
          <Text style={styles.allowButtonText}>Allow Location Access</Text>
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
    marginBottom: 15,
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