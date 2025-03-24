import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  Platform,
  TextInput
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const HelpCenterScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState('faq1');
  const [expandedContact, setExpandedContact] = useState('whatsapp');
  
  // FAQ data
  const faqData = [
    {
      id: 'faq1',
      question: 'What if need to cancel a booking?',
      answer: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod .Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      id: 'faq2',
      question: 'Is safe to use App?',
      answer: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod .Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      id: 'faq3',
      question: 'How do i receive Booking Details?',
      answer: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod .Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      id: 'faq4',
      question: 'How can i edit my profile information?',
      answer: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod .Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      id: 'faq5',
      question: 'How to cancel Taxi?',
      answer: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod .Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      id: 'faq6',
      question: 'Is Voice call or Chat Feature there?',
      answer: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod .Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      id: 'faq7',
      question: 'How to see pre-booked Taxi?',
      answer: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod .Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    }
  ];
  
  // Contact data
  const contactData = [
    {
      id: 'customer_service',
      title: 'Customer Service',
      icon: 'headset-outline',
      content: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      id: 'whatsapp',
      title: 'Whatsapp',
      icon: 'logo-whatsapp',
      content: '(480) 555-0103',
      isExpanded: true
    },
    {
      id: 'website',
      title: 'Website',
      icon: 'globe-outline',
      content: 'www.example.com'
    },
    {
      id: 'facebook',
      title: 'Facebook',
      icon: 'logo-facebook',
      content: 'facebook.com/yourtaxi'
    },
    {
      id: 'twitter',
      title: 'Twitter',
      icon: 'logo-twitter',
      content: 'twitter.com/yourtaxi'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: 'logo-instagram',
      content: 'instagram.com/yourtaxi'
    }
  ];
  
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  const toggleContact = (id) => {
    setExpandedContact(expandedContact === id ? null : id);
  };
  
  // Filter options
  const filterOptions = ['All', 'Services', 'General', 'Account'];
  const [activeFilter, setActiveFilter] = useState('All');
  
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
        
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={24} color="#FFD600" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search in reviews"
            placeholderTextColor="#999999"
          />
        </View>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
          onPress={() => setActiveTab('faq')}
        >
          <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>Faq</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
          onPress={() => setActiveTab('contact')}
        >
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>Contact Us</Text>
        </TouchableOpacity>
      </View>
      
      {/* FAQ Content */}
      {activeTab === 'faq' && (
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {/* Filter Options */}
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.map((option) => (
                <TouchableOpacity 
                  key={option}
                  style={[styles.filterOption, activeFilter === option && styles.activeFilterOption]}
                  onPress={() => setActiveFilter(option)}
                >
                  <Text style={[styles.filterText, activeFilter === option && styles.activeFilterText]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* FAQ Items */}
          {faqData.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.faqQuestion}
                onPress={() => toggleFaq(faq.id)}
              >
                <Text style={styles.questionText}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color="#FFD600" 
                />
              </TouchableOpacity>
              
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
          
          {/* Bottom padding for scroll */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
      
      {/* Contact Us Content */}
      {activeTab === 'contact' && (
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {/* Contact Items */}
          {contactData.map((contact) => (
            <View key={contact.id} style={styles.contactItem}>
              <TouchableOpacity 
                style={styles.contactHeader}
                onPress={() => toggleContact(contact.id)}
              >
                <View style={styles.contactTitle}>
                  <Ionicons name={contact.icon} size={24} color="#FFD600" style={styles.contactIcon} />
                  <Text style={styles.contactTitleText}>{contact.title}</Text>
                </View>
                <Ionicons 
                  name={expandedContact === contact.id ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color="#000000" 
                />
              </TouchableOpacity>
              
              {expandedContact === contact.id && (
                <View style={styles.contactContent}>
                  <View style={styles.dotContainer}>
                    <View style={styles.dot} />
                  </View>
                  <Text style={styles.contactContentText}>{contact.content}</Text>
                </View>
              )}
            </View>
          ))}
          
          {/* Bottom padding for scroll */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFD600',
  },
  activeTabText: {
    color: '#FFD600',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  filterOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
  },
  activeFilterOption: {
    backgroundColor: '#FFD600',
  },
  filterText: {
    fontSize: 16,
    color: '#333333',
  },
  activeFilterText: {
    color: '#000000',
    fontWeight: '600',
  },
  faqItem: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    padding: 20,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  answerText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  contactItem: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    overflow: 'hidden',
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  contactTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 15,
  },
  contactTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dotContainer: {
    marginRight: 15,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD600',
  },
  contactContentText: {
    fontSize: 16,
    color: '#666666',
  },
  bottomPadding: {
    height: 40,
  },
});

export default HelpCenterScreen; 