import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const ProfileDetailsScreen = ({ navigation }) => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Jenny Wilson',
    phone: '603.555.0123',
    email: 'example@gmail.com',
    city: 'Jersey City, New Jersey City'
  });

  const handleUpdate = () => {
    // In a real app, this would send the updated profile to an API
    console.log('Profile updated:', userData);
    navigation.goBack();
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
        
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="pencil" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={userData.name}
              onChangeText={(text) => setUserData({...userData, name: text})}
            />
          </View>
          
          {/* Phone Number Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <View style={styles.phoneContainer}>
              <TextInput
                style={styles.phoneInput}
                value={userData.phone}
                onChangeText={(text) => setUserData({...userData, phone: text})}
                keyboardType="phone-pad"
                editable={false} // Usually phone numbers can't be edited directly
              />
              <TouchableOpacity style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={userData.email}
              onChangeText={(text) => setUserData({...userData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          {/* City Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>City You Drive In</Text>
            <TouchableOpacity style={styles.dropdownInput}>
              <Text style={styles.dropdownText}>{userData.city}</Text>
              <Ionicons name="chevron-down" size={24} color="#FFD600" />
            </TouchableOpacity>
          </View>
          
          {/* Document Details */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Document Details</Text>
            <TouchableOpacity style={styles.documentButton}>
              <Text style={styles.documentButtonText}>Update Document Details</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFD600" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Update Button */}
      <View style={styles.updateButtonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#FFD600',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  textInput: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
  },
  phoneContainer: {
    flexDirection: 'row',
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000000',
  },
  changeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  changeButtonText: {
    color: '#FFD600',
    fontWeight: '600',
    fontSize: 16,
  },
  dropdownInput: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
  },
  documentButton: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  updateButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  updateButton: {
    backgroundColor: '#FFD600',
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileDetailsScreen; 