import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const LogoutModal = ({ visible, onCancel, onLogout }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          
          <Text style={styles.modalTitle}>Logout</Text>
          
          <Text style={styles.modalMessage}>
            Are you sure you want to log out?
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={onLogout}
            >
              <Text style={styles.logoutButtonText}>Yes, Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  cancelButton: {
    width: width * 0.4,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  logoutButton: {
    width: width * 0.4,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD600',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default LogoutModal; 