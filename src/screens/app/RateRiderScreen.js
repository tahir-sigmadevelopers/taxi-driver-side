import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const RateRiderScreen = ({ navigation, route }) => {
  const { rideDetails } = route.params || {
    passengerName: 'Esther Howard',
    fareAmount: 15.00,
    distance: '12 Miles',
  };

  const [rating, setRating] = useState(4); // Default 4-star rating
  const [review, setReview] = useState('');

  // Handle rating selection
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  // Handle submit rating
  const handleSubmit = () => {
    console.log('Submitted rating:', rating);
    console.log('Review:', review);
    
    // In a real app, this would send the rating to an API
    
    // Navigate back to home screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  // Render star based on selected rating
  const renderStar = (position) => {
    const isSelected = position <= rating;
    
    return (
      <TouchableOpacity
        key={position}
        style={styles.starContainer}
        onPress={() => handleRating(position)}
      >
        <Ionicons
          name="star"
          size={40}
          color={isSelected ? '#FFD600' : '#AAAAAA'}
        />
      </TouchableOpacity>
    );
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
        
        <Text style={styles.headerTitle}>Rate Rider</Text>
      </View>
      
      <View style={styles.contentContainer}>
        {/* Passenger Info */}
        <View style={styles.passengerContainer}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.passengerImage} 
          />
          
          <Text style={styles.passengerName}>{rideDetails.passengerName}</Text>
          
          <View style={styles.fareContainer}>
            <Text style={styles.fareAmount}>${rideDetails.fareAmount.toFixed(2)}</Text>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.distance}>{rideDetails.distance}</Text>
          </View>
        </View>
        
        {/* Trip Question */}
        <Text style={styles.tripQuestion}>
          How was your trip with {'\n'}
          {rideDetails.passengerName}
        </Text>
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>Your overall rating</Text>
          
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(position => renderStar(position))}
          </View>
        </View>
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Add detailed review</Text>
          
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter here"
              placeholderTextColor="#999999"
              multiline
              value={review}
              onChangeText={setReview}
            />
          </View>
        </View>
        
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 10 : 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
    marginBottom: 5,
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
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  passengerContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  passengerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  passengerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  fareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareAmount: {
    fontSize: 16,
    color: '#666666',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#FFD600',
    marginHorizontal: 8,
  },
  distance: {
    fontSize: 16,
    color: '#666666',
  },
  tripQuestion: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 20,
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  starContainer: {
    padding: 5,
  },
  reviewSection: {
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 12,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 120,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RateRiderScreen; 