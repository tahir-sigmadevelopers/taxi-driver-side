import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const CancellationSuccessScreen = ({ navigation, route }) => {
  const { booking } = route.params || { crn: '#854HG23' };
  
  // Handle Got it button press
  const handleGotIt = () => {
    // Navigate back to Booking screen, resetting the stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <View>
            <Ionicons name="chevron-back" size={24} color="#888888" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Cancel Taxi Booking</Text>
        
        <View style={{ width: 40 }} /> {/* Empty view for balance */}
      </View>
      
      {/* Instruction (faded from previous screen) */}
      <View style={styles.fadedSection}>
        <Text style={styles.fadedInstruction}>Please select the reason for cancellations:</Text>
        
        {/* Radio buttons (faded) */}
        <View style={styles.fadedRadioItem}>
          <View style={styles.fadedRadioOuter}>
            <View style={styles.fadedRadioInner} />
          </View>
          <Text style={styles.fadedRadioText}>Schedule Change</Text>
        </View>
        
        {/* Other radio buttons and fields are faded out (not rendered fully) */}
      </View>
      
      {/* Divider */}
      <View style={styles.divider} />
      
      {/* Success Content */}
      <View style={styles.successContainer}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="close" size={40} color="#000000" />
        </View>
        
        {/* Success Message */}
        <Text style={styles.successTitle}>Booking Cancelled Successfully</Text>
        <Text style={styles.successMessage}>
          Your booking with CRN : {booking.crn || '#854HG23'}{'\n'}
          has been cancelled successfully.
        </Text>
        
        {/* Got It Button */}
        <TouchableOpacity 
          style={styles.gotItButton}
          onPress={handleGotIt}
        >
          <Text style={styles.gotItButtonText}>Got it</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888888',
  },
  fadedSection: {
    paddingHorizontal: 20,
  },
  fadedInstruction: {
    fontSize: 18,
    color: '#AAAAAA',
    marginTop: 20,
    marginBottom: 30,
  },
  fadedRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  fadedRadioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fadedRadioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#DDDDDD',
  },
  fadedRadioText: {
    fontSize: 18,
    color: '#AAAAAA',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginTop: 30,
    marginBottom: 40,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  gotItButton: {
    backgroundColor: '#FFD600',
    width: '100%',
    height: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  gotItButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
});

export default CancellationSuccessScreen; 