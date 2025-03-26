import React, { useState, useEffect } from 'react';
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

// Extended country code data with many countries
const COUNTRY_CODES = [
  { id: 'us', code: '+1', flag: '🇺🇸', name: 'United States' },
  { id: 'gb', code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { id: 'ca', code: '+1', flag: '🇨🇦', name: 'Canada' },
  { id: 'au', code: '+61', flag: '🇦🇺', name: 'Australia' },
  { id: 'de', code: '+49', flag: '🇩🇪', name: 'Germany' },
  { id: 'fr', code: '+33', flag: '🇫🇷', name: 'France' },
  { id: 'jp', code: '+81', flag: '🇯🇵', name: 'Japan' },
  { id: 'in', code: '+91', flag: '🇮🇳', name: 'India' },
  { id: 'cn', code: '+86', flag: '🇨🇳', name: 'China' },
  { id: 'br', code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { id: 'ru', code: '+7', flag: '🇷🇺', name: 'Russia' },
  { id: 'it', code: '+39', flag: '🇮🇹', name: 'Italy' },
  { id: 'es', code: '+34', flag: '🇪🇸', name: 'Spain' },
  { id: 'mx', code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { id: 'kr', code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { id: 'za', code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { id: 'ng', code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { id: 'ar', code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { id: 'pk', code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { id: 'bd', code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { id: 'eg', code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { id: 'vn', code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { id: 'id', code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { id: 'ph', code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { id: 'tr', code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { id: 'th', code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { id: 'sa', code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { id: 'ae', code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { id: 'my', code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { id: 'sg', code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { id: 'il', code: '+972', flag: '🇮🇱', name: 'Israel' },
  { id: 'hk', code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { id: 'se', code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { id: 'no', code: '+47', flag: '🇳🇴', name: 'Norway' },
  { id: 'dk', code: '+45', flag: '🇩🇰', name: 'Denmark' },
  { id: 'fi', code: '+358', flag: '🇫🇮', name: 'Finland' },
  { id: 'ch', code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { id: 'nl', code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { id: 'be', code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { id: 'at', code: '+43', flag: '🇦🇹', name: 'Austria' },
];

// Cities for each country - object with country id as key and array of cities as value
const CITIES_BY_COUNTRY = {
  us: [
    { id: 'nyc', label: 'New York City, NY' },
    { id: 'la', label: 'Los Angeles, CA' },
    { id: 'chicago', label: 'Chicago, IL' },
    { id: 'houston', label: 'Houston, TX' },
    { id: 'miami', label: 'Miami, FL' },
    { id: 'sf', label: 'San Francisco, CA' },
    { id: 'seattle', label: 'Seattle, WA' },
    { id: 'boston', label: 'Boston, MA' },
    { id: 'philly', label: 'Philadelphia, PA' },
    { id: 'dallas', label: 'Dallas, TX' },
    { id: 'atl', label: 'Atlanta, GA' },
    { id: 'denver', label: 'Denver, CO' },
    { id: 'phoenix', label: 'Phoenix, AZ' },
    { id: 'vegas', label: 'Las Vegas, NV' },
    { id: 'portland', label: 'Portland, OR' },
  ],
  ca: [
    { id: 'toronto', label: 'Toronto, ON' },
    { id: 'montreal', label: 'Montreal, QC' },
    { id: 'vancouver', label: 'Vancouver, BC' },
    { id: 'calgary', label: 'Calgary, AB' },
    { id: 'ottawa', label: 'Ottawa, ON' },
    { id: 'edmonton', label: 'Edmonton, AB' },
    { id: 'quebec', label: 'Quebec City, QC' },
    { id: 'winnipeg', label: 'Winnipeg, MB' },
  ],
  gb: [
    { id: 'london', label: 'London' },
    { id: 'manchester', label: 'Manchester' },
    { id: 'birmingham', label: 'Birmingham' },
    { id: 'leeds', label: 'Leeds' },
    { id: 'glasgow', label: 'Glasgow' },
    { id: 'liverpool', label: 'Liverpool' },
    { id: 'edinburgh', label: 'Edinburgh' },
    { id: 'bristol', label: 'Bristol' },
  ],
  au: [
    { id: 'sydney', label: 'Sydney, NSW' },
    { id: 'melbourne', label: 'Melbourne, VIC' },
    { id: 'brisbane', label: 'Brisbane, QLD' },
    { id: 'perth', label: 'Perth, WA' },
    { id: 'adelaide', label: 'Adelaide, SA' },
    { id: 'goldcoast', label: 'Gold Coast, QLD' },
    { id: 'canberra', label: 'Canberra, ACT' },
  ],
  in: [
    { id: 'mumbai', label: 'Mumbai' },
    { id: 'delhi', label: 'Delhi' },
    { id: 'bangalore', label: 'Bangalore' },
    { id: 'hyderabad', label: 'Hyderabad' },
    { id: 'chennai', label: 'Chennai' },
    { id: 'kolkata', label: 'Kolkata' },
    { id: 'pune', label: 'Pune' },
    { id: 'ahmedabad', label: 'Ahmedabad' },
  ],
  de: [
    { id: 'berlin', label: 'Berlin' },
    { id: 'hamburg', label: 'Hamburg' },
    { id: 'munich', label: 'Munich' },
    { id: 'cologne', label: 'Cologne' },
    { id: 'frankfurt', label: 'Frankfurt' },
    { id: 'stuttgart', label: 'Stuttgart' },
    { id: 'dusseldorf', label: 'Düsseldorf' },
  ],
  // Default for any country not explicitly listed
  default: [
    { id: 'capital', label: 'Capital City' },
    { id: 'major1', label: 'Major City 1' },
    { id: 'major2', label: 'Major City 2' },
    { id: 'major3', label: 'Major City 3' },
  ]
};

const CompleteProfileScreen = ({ navigation, route }) => {
  // Get the email and name from route params
  const { email: userEmail, name: userName } = route.params || {};
  
  const [name, setName] = useState(userName || 'Your Name');
  const [email, setEmail] = useState(userEmail || 'example@email.com');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [selectedCity, setSelectedCity] = useState('');
  const [countryDialCode, setCountryDialCode] = useState('+1');
  const [availableCities, setAvailableCities] = useState([]);
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [citySearchText, setCitySearchText] = useState('');
  const [countrySearchText, setCountrySearchText] = useState('');
  
  // Determine if a country has specific cities in our database
  const hasSpecificCities = (countryCode) => {
    return Object.keys(CITIES_BY_COUNTRY).includes(countryCode) && CITIES_BY_COUNTRY[countryCode].length > 0;
  };

  // Initialize available cities based on default country
  useEffect(() => {
    // Update available cities when country changes
    if (hasSpecificCities(selectedCountryCode)) {
      setAvailableCities(CITIES_BY_COUNTRY[selectedCountryCode] || []);
    } else {
      setAvailableCities([]);
    }
    
    // Find dial code for selected country
    const country = COUNTRY_CODES.find(c => c.id === selectedCountryCode);
    if (country) {
      setCountryDialCode(country.code);
    }
  }, [selectedCountryCode]);

  // Show all countries matching search or all if no search
  const filteredCountries = countrySearchText 
    ? COUNTRY_CODES.filter(country => 
        country.name.toLowerCase().includes(countrySearchText.toLowerCase()) ||
        country.code.includes(countrySearchText))
    : COUNTRY_CODES;

  // Show all cities matching search or all if no search
  const filteredCities = citySearchText
    ? availableCities.filter(city => 
        city.toLowerCase().includes(citySearchText.toLowerCase()))
    : availableCities;

  // Get the selected country object
  const selectedCountryObj = COUNTRY_CODES.find(c => c.id === selectedCountryCode) || COUNTRY_CODES[0];

  // Handle selection of a country
  const handleCountrySelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
    
    // Reset selected city if the new country doesn't have it
    if (!hasSpecificCities(countryCode) || 
        (availableCities.length > 0 && !availableCities.includes(selectedCity))) {
      setSelectedCity('');
    }
    
    setCountryModalVisible(false);
    setCountrySearchText('');
  };

  // Handle selection of a city
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCityModalVisible(false);
    setCitySearchText('');
  };

  // Handle adding a custom city
  const handleCustomCityInput = () => {
    if (citySearchText) {
      setSelectedCity(citySearchText);
      setCityModalVisible(false);
      setCitySearchText('');
    }
  };

  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Modal states
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (field === 'gender') {
      setGender(value);
    } else if (field === 'city') {
      setSelectedCity(value);
    }
  };

  const handleSelectGender = (gender) => {
    handleInputChange('gender', gender.label);
    setGenderModalVisible(false);
  };

  const handleContinue = async () => {
    if (!phoneNumber || !gender || !selectedCity) {
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

  // Generic modal component for selection
  const SelectionModal = ({ visible, onClose, data, onSelect, title, searchable, searchText, onSearchChange, renderItem, ListFooterComponent }) => (
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
          
          {searchable && (
            <View style={styles.searchContainer}>
              <TextInput 
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={onSearchChange}
                autoCapitalize="none"
                autoFocus
              />
            </View>
          )}
          
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem || (({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            )}
            ListFooterComponent={ListFooterComponent}
            contentContainerStyle={styles.flatListContent}
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
                placeholder="Enter your name"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Enter your email"
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneInputContainer}>
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  onPress={() => setCountryModalVisible(true)}
                >
                  <Text style={styles.countryCodeText}>
                    {selectedCountryObj.flag} {countryDialCode}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Mobile Number"
                  value={phoneNumber}
                  onChangeText={(text) => handleInputChange('phoneNumber', text)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setGenderModalVisible(true)}
              >
                <Text style={gender ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {gender || 'Select'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>City You Drive In</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setCityModalVisible(true)}
              >
                <Text style={selectedCity ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {selectedCity || 'Select a city'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
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
              <Text style={styles.termsText}>Agree with </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                <Text style={styles.termsLink}>Terms & Condition</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.continueButton, loading && styles.disabledButton]}
              onPress={handleContinue}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text style={styles.continueButtonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Gender Selection Modal */}
      <SelectionModal
        visible={genderModalVisible}
        onClose={() => setGenderModalVisible(false)}
        data={GENDER_OPTIONS}
        onSelect={handleSelectGender}
        title="Select Gender"
      />

      {/* Country Code Selection Modal */}
      <SelectionModal
        visible={isCountryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        data={filteredCountries}
        onSelect={handleCountrySelect}
        title="Select Country Code"
        searchable={true}
        searchText={countrySearchText}
        onSearchChange={setCountrySearchText}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleCountrySelect(item.id)}
          >
            <Text style={styles.optionText}>
              {item.flag} {item.code} {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* City Selection Modal */}
      <SelectionModal
        visible={isCityModalVisible}
        onClose={() => setCityModalVisible(false)}
        data={filteredCities}
        onSelect={handleCitySelect}
        title="Select City"
        searchable={true}
        searchText={citySearchText}
        onSearchChange={setCitySearchText}
        ListFooterComponent={
          (citySearchText && (filteredCities.length === 0 || !hasSpecificCities(selectedCountryCode))) ? (
            <TouchableOpacity 
              style={styles.customEntryButton}
              onPress={handleCustomCityInput}
            >
              <Text style={styles.customEntryText}>
                Add '{citySearchText}' as a custom city
              </Text>
            </TouchableOpacity>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleCitySelect(item)}
          >
            <Text style={styles.optionText}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: '100%',
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 8,
    color: '#333333',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333333',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999999',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  checkbox: {
    marginRight: 8,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    color: '#666666',
  },
  termsLink: {
    fontSize: 14,
    color: '#FFD600',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FFD600',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  optionItem: {
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  customEntryButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 8,
    backgroundColor: '#FFFAED',
  },
  customEntryText: {
    fontSize: 16,
    color: '#FFD600',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 36,
  },
});

export default CompleteProfileScreen; 