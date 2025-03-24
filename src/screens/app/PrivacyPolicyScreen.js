import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const PrivacyPolicyScreen = ({ navigation }) => {
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
        
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Cancelation Policy</Text>
        
        <Text style={styles.sectionText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </Text>
        
        <Text style={styles.sectionText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        
        <Text style={styles.sectionTitle}>Terms & Condition</Text>
        
        <Text style={styles.sectionText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </Text>
        
        <Text style={styles.sectionText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        
        <Text style={styles.sectionText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </Text>
        
        <Text style={styles.sectionText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </Text>
        
        {/* Add some bottom padding for scrolling */}
        <View style={styles.bottomPadding} />
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD600',
    marginBottom: 16,
    marginTop: 24,
  },
  sectionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 16,
  },
  bottomPadding: {
    height: 40,
  }
});

export default PrivacyPolicyScreen; 