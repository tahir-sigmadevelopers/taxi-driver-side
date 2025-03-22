import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample data for gender and cities
const GENDER_OPTIONS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
  { id: 'preferNotToSay', label: 'Prefer not to say' }
];

const CITY_OPTIONS = [
  { id: 'nyc', label: 'New York City' },
  { id: 'jersey', label: 'Jersey City, New Jersey' },
  { id: 'la', label: 'Los Angeles' },
  { id: 'chicago', label: 'Chicago' },
  { id: 'houston', label: 'Houston' },
  { id: 'miami', label: 'Miami' },
  { id: 'sf', label: 'San Francisco' },
  { id: 'seattle', label: 'Seattle' },
  { id: 'boston', label: 'Boston' },
  { id: 'philly', label: 'Philadelphia' }
];

const CompleteProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('Esther Howard');
  const [email, setEmail] = useState('example@gmail.com');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Modal states
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'phoneNumber') {
      setPhone(value);
    } else if (field === 'gender') {
      setGender(value);
    } else if (field === 'city') {
      setCity(value);
    }
  };

  const handleSelectGender = (gender) => {
    handleInputChange('gender', gender.label);
    setGenderModalVisible(false);
  };

  const handleSelectCity = (city) => {
    handleInputChange('city', city.label);
    setCityModalVisible(false);
  };

  const handleContinue = async () => {
    if (!phone || !gender || !city) {
      alert('Please fill in all fields');
      return;
    }

    if (!agreeToTerms) {
      alert('You must agree to the Terms & Condition');
      return;
    }

    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the next screen
      navigation.navigate('NewPassword');
    } catch (err) {
      alert('Failed to save profile information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Modal component for selection
  const SelectionModal = ({ visible, onClose, data, onSelect, title }) => (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
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

          <Text style={styles.title}>Complete your Profile</Text>
          <Text style={styles.subtitle}>
            Don't worry, only you can see your personal data, No one else will be able to see it.
          </Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => handleInputChange('name', text)}
                editable={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => handleInputChange('email', text)}
                editable={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneContainer}>
                <TouchableOpacity style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+46</Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Mobile Number"
                  value={phone}
                  onChangeText={(text) => handleInputChange('phoneNumber', text)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setShowGenderDropdown(!showGenderDropdown)}
              >
                <Text style={gender ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {gender || 'Select'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              {showGenderDropdown && (
                <View style={styles.dropdownList}>
                  {GENDER_OPTIONS.map((option, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.dropdownItem}
                      onPress={() => {
                        handleInputChange('gender', option.label);
                        setShowGenderDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>City You Drive In</Text>
              <View style={styles.dropdownButton}>
                <TextInput
                  style={styles.cityInput}
                  placeholder="Jersey City, New Jersey City"
                  value={city}
                  onChangeText={(text) => handleInputChange('city', text)}
                />
                <Ionicons name="chevron-down" size={16} color="#666" />
              </View>
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity 
                style={styles.checkbox} 
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                {agreeToTerms ? (
                  <View style={styles.checkedBox}>
                    <Ionicons name="checkmark" size={18} color="white" />
                  </View>
                ) : (
                  <View style={styles.uncheckedBox} />
                )}
              </TouchableOpacity>
              <Text style={styles.termsText}>By Accept, you agree to Company </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                <Text style={styles.termsLink}>Terms & Condition</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.continueButton, loading && styles.disabledButton]}
            onPress={handleContinue}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        {/* Gender Selection Modal */}
        <SelectionModal
          visible={genderModalVisible}
          onClose={() => setGenderModalVisible(false)}
          data={GENDER_OPTIONS}
          onSelect={handleSelectGender}
          title="Select Gender"
        />

        {/* City Selection Modal */}
        <SelectionModal
          visible={cityModalVisible}
          onClose={() => setCityModalVisible(false)}
          data={CITY_OPTIONS}
          onSelect={handleSelectCity}
          title="Select City"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 24,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#AAA',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#FFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  cityInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 8,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
  },
  checkedBox: {
    width: 24,
    height: 24,
    backgroundColor: '#FFD600',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
  },
  termsLink: {
    fontSize: 14,
    color: '#FFD600',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FFD600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionItem: {
    padding: 20,
  },
  optionText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  }
});

export default CompleteProfileScreen; 