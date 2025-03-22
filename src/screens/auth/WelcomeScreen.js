import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const WelcomeScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  // Get user name from auth context or params
  const userName = "Esther";

  const handleContinue = async () => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show submission modal instead of navigating
      setShowSubmissionModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSubmissionModal(false);
    // Navigate to LocationPermissionScreen instead of directly to App
    navigation.navigate('LocationPermission');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Welcome!, {userName}</Text>

        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>Required Steps</Text>
          
          <TouchableOpacity 
            style={styles.stepItem}
            onPress={() => {
              // Navigate to profile picture upload screen
              navigation.navigate('ProfilePicture');
            }}
          >
            <Text style={styles.stepText}>Profile Picture</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.stepItem}
            onPress={() => {
              // Navigate to bank account details screen
              navigation.navigate('BankAccountDetails');
            }}
          >
            <Text style={styles.stepText}>Bank Account Details</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.stepItem}
            onPress={() => {
              // Navigate to driving details screen
              navigation.navigate('DrivingDetails');
            }}
          >
            <Text style={styles.stepText}>Driving Details</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, styles.submittedTitle]}>Submitted Steps</Text>
          
          <TouchableOpacity 
            style={styles.stepItem}
            onPress={() => {
              // Navigate to government ID screen
              navigation.navigate('GovernmentID');
            }}
          >
            <Text style={styles.stepText}>Government ID</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.continueButtonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Application Submitted Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSubmissionModal}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle} />
            
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark" size={50} color="#FFFFFF" />
            </View>
            
            <Text style={styles.modalTitle}>Application Submitted for Verification</Text>
            <Text style={styles.modalDescription}>We will get in touch with you in 48 hours.</Text>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
    textAlign: 'center',
  },
  sectionsContainer: {
    flex: 1,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  submittedTitle: {
    marginTop: 30,
  },
  stepItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  stepText: {
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginTop: 'auto',
    height: 55,
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 30,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD600',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  modalButton: {
    backgroundColor: '#FFD600',
    borderRadius: 30,
    width: '80%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen; 