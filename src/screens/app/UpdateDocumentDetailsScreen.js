import React from 'react';
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

const UpdateDocumentDetailsScreen = ({ navigation }) => {
  const documentOptions = [
    {
      id: 'bank',
      title: 'Bank Account Details',
      onPress: () => navigation.navigate('BankAccountDetailsScreen')
    },
    {
      id: 'profile',
      title: 'Profile Picture',
      onPress: () => navigation.navigate('ProfilePictureScreen')
    },
    {
      id: 'driving',
      title: 'Driving Details',
      onPress: () => navigation.navigate('DrivingDetailsScreen')
    },
    {
      id: 'government',
      title: 'Government ID',
      onPress: () => navigation.navigate('GovernmentIDScreen')
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
        
        <Text style={styles.headerTitle}>Update Document Details</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {documentOptions.map((option) => (
          <TouchableOpacity 
            key={option.id}
            style={styles.optionItem}
            onPress={option.onPress}
          >
            <Text style={styles.optionText}>{option.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  }
});

export default UpdateDocumentDetailsScreen; 