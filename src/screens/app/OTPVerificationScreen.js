import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const OTPVerificationScreen = ({ navigation, route }) => {
  const { rideDetails } = route.params || {
    passengerName: 'Esther Howard',
    passengerMobile: '+1 (555) 123-4567',
  };
  
  // State for OTP digits
  const [otp, setOtp] = useState(['2', '8', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Refs for TextInput focus management
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  
  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus to next field if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  // Handle backspace key press
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input when backspace is pressed on an empty field
      inputRefs[index - 1].current.focus();
    }
  };
  
  // Handle resend code
  const handleResendCode = () => {
    console.log('Resending OTP code');
    // Reset OTP fields
    setOtp(['', '', '', '']);
    // Focus first input
    inputRefs[0].current.focus();
  };
  
  // Handle verify button press
  const handleVerify = () => {
    // Check if OTP is complete
    if (otp.some(digit => digit === '')) {
      console.log('OTP is incomplete');
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate verification (in a real app, this would call an API)
    setTimeout(() => {
      setIsVerifying(false);
      console.log('OTP verified successfully');
      
      // Navigate to next screen (to be implemented)
      navigation.navigate('Main');
    }, 1500);
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
        
        <Text style={styles.headerTitle}>OTP Verification</Text>
      </View>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>
          Enter {rideDetails.passengerName.split(' ')[0]}'s OTP
        </Text>
        
        {/* Instruction */}
        <Text style={styles.instruction}>
          We sent a PIN to your customer's{'\n'}mobile number
        </Text>
        
        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectionColor="#FFD600"
            />
          ))}
        </View>
        
        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive OTP?</Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendLink}>Resend code</Text>
          </TouchableOpacity>
        </View>
        
        {/* Verify Button */}
        <TouchableOpacity 
          style={styles.verifyButton}
          onPress={handleVerify}
          disabled={otp.some(digit => digit === '') || isVerifying}
        >
          <Text style={styles.verifyButtonText}>
            {isVerifying ? 'Verifying...' : 'Verify & Start Ride'}
          </Text>
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
    paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
    paddingBottom: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 14,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  resendLink: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  verifyButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen; 