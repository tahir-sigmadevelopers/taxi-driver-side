import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { verifyCode, sendVerificationCode } from '../../config/firebase';

const VerifyCodeScreen = ({ navigation, route }) => {
  const { email = 'example@email.com' } = route.params || {};
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Start countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (text, index) => {
    // Only allow digits
    if (!/^\d*$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-advance to next input
    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index, value) => {
    if (value === '' && index > 0) {
      // Move to previous input on backspace
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const { error } = await sendVerificationCode(email);
      
      if (error) {
        Alert.alert('Error', error);
        return;
      }

      // Reset timer and UI
      setTimer(60);
      setCode(['', '', '', '']);
      inputRefs[0].current.focus();
      Alert.alert('Code Resent', 'A new verification code has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 4) {
      Alert.alert('Invalid Code', 'Please enter the 4-digit verification code');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await verifyCode(email, verificationCode);
      
      if (error) {
        Alert.alert('Verification Failed', error);
        return;
      }

      // Navigate to complete profile on success
      navigation.navigate('CompleteProfile');
    } catch (error) {
      Alert.alert('Verification Failed', 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.subtitle}>Please enter the code we just sent to email</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <View key={index} style={styles.codeInputContainer}>
            <TextInput
              ref={inputRefs[index]}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index, digit);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={index === 0}
            />
          </View>
        ))}
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive OTP?</Text>
        <TouchableOpacity 
          onPress={handleResendCode}
          disabled={timer > 0 || isLoading}
        >
          <Text style={[styles.resendButton, (timer > 0 || isLoading) && styles.disabledText]}>
            {timer > 0 ? `Resend code (${formatTime(timer)})` : 'Resend code'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.verifyButton, isLoading && styles.disabledButton]} 
        onPress={handleVerify}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: '#FFD600',
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  codeInputContainer: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resendButton: {
    fontSize: 14,
    color: '#FFD600',
    fontWeight: 'bold',
  },
  disabledText: {
    opacity: 0.5,
  },
  verifyButton: {
    backgroundColor: '#FFD600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default VerifyCodeScreen; 