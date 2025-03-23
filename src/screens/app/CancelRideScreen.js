import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const CancelRideScreen = ({ navigation, route }) => {
  const { booking } = route.params || {};
  
  // Cancellation reason options
  const reasonOptions = [
    'Rider Not Available',
    'rider want to book another cab',
    'Rider Misbehave',
    'Taxi Breakdown',
    'Puncture',
    'Other'
  ];
  
  // State
  const [selectedReason, setSelectedReason] = useState(reasonOptions[0]);
  const [otherReason, setOtherReason] = useState('');
  
  // Handle reason selection
  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };
  
  // Handle submitting the cancellation
  const handleSubmit = () => {
    if (selectedReason || (selectedReason === 'other' && otherReason.trim() !== '')) {
      // Navigate to success screen
      navigation.navigate('CancellationSuccessScreen', { 
        booking: route.params?.booking 
      });
    } else {
      // Show error alert
      Alert.alert(
        'Error',
        'Please select a reason for cancellation',
        [{ text: 'OK' }]
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
        
        <Text style={styles.headerTitle}>Cancel Ride</Text>
        
        <View style={{ width: 40 }} /> {/* Empty view for balance */}
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Instruction */}
        <Text style={styles.instruction}>Please select the reason for cancellations:</Text>
        
        {/* Reasons List */}
        <View style={styles.reasonsContainer}>
          {reasonOptions.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonItem}
              onPress={() => handleReasonSelect(reason)}
            >
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedReason === reason && styles.radioOuterSelected
                ]}>
                  {selectedReason === reason && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Other Reason Input */}
        {selectedReason === 'Other' && (
          <View style={styles.otherContainer}>
            <Text style={styles.otherLabel}>Other</Text>
            <TextInput
              style={styles.otherInput}
              placeholder="Enter Your Reason"
              placeholderTextColor="#999999"
              value={otherReason}
              onChangeText={setOtherReason}
              multiline
            />
          </View>
        )}
        
        {/* Divider */}
        <View style={styles.divider} />
      </ScrollView>
      
      {/* Cancel Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleSubmit}
        >
          <Text style={styles.cancelButtonText}>Cancel Ride</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instruction: {
    fontSize: 18,
    color: '#666666',
    marginTop: 20,
    marginBottom: 30,
  },
  reasonsContainer: {
    marginBottom: 20,
  },
  reasonItem: {
    paddingVertical: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: '#FFD600',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FFD600',
  },
  reasonText: {
    fontSize: 18,
    color: '#000000',
  },
  otherContainer: {
    marginVertical: 20,
  },
  otherLabel: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  otherInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 15,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 20,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    backgroundColor: '#FFD600',
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});

export default CancelRideScreen; 