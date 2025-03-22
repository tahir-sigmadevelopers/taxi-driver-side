import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

// Sample earnings data
const earningsData = {
  currentWeek: {
    total: 845.30,
    rides: 32,
    hours: 38.5,
    days: [
      { day: 'Mon', amount: 125.70, rides: 5 },
      { day: 'Tue', amount: 142.50, rides: 6 },
      { day: 'Wed', amount: 167.80, rides: 7 },
      { day: 'Thu', amount: 156.30, rides: 6 },
      { day: 'Fri', amount: 185.90, rides: 8 },
      { day: 'Sat', amount: 67.10, rides: 0 },
      { day: 'Sun', amount: 0.00, rides: 0 }
    ]
  },
  transactions: [
    { id: '1', type: 'payout', amount: 845.30, date: '14 Sept 2023', status: 'completed' },
    { id: '2', type: 'payout', amount: 762.50, date: '07 Sept 2023', status: 'completed' },
    { id: '3', type: 'payout', amount: 890.15, date: '31 Aug 2023', status: 'completed' },
    { id: '4', type: 'payout', amount: 810.75, date: '24 Aug 2023', status: 'completed' },
    { id: '5', type: 'payout', amount: 920.40, date: '17 Aug 2023', status: 'completed' }
  ]
};

const EarningsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('earnings');

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.transactionItem}
      onPress={() => {}}
    >
      <View style={styles.transactionIcon}>
        <Ionicons name="wallet-outline" size={24} color="#000" />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>
          Weekly Payout
        </Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'earnings' && styles.activeTabButton]}
          onPress={() => setActiveTab('earnings')}
        >
          <Text style={[styles.tabText, activeTab === 'earnings' && styles.activeTabText]}>
            Earnings
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'transactions' && styles.activeTabButton]}
          onPress={() => setActiveTab('transactions')}
        >
          <Text style={[styles.tabText, activeTab === 'transactions' && styles.activeTabText]}>
            Transactions
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'earnings' ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.earningsSummary}>
            <Text style={styles.summaryLabel}>This Week So Far</Text>
            <Text style={styles.summaryAmount}>${earningsData.currentWeek.total.toFixed(2)}</Text>
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{earningsData.currentWeek.rides}</Text>
                <Text style={styles.statLabel}>Rides</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{earningsData.currentWeek.hours.toFixed(1)}</Text>
                <Text style={styles.statLabel}>Hours</Text>
              </View>
            </View>
          </View>

          <View style={styles.dailyEarnings}>
            <Text style={styles.sectionTitle}>Daily Earnings</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.daysContainer}
            >
              {earningsData.currentWeek.days.map((day, index) => (
                <View key={index} style={styles.dayCard}>
                  <Text style={styles.dayText}>{day.day}</Text>
                  <View 
                    style={[
                      styles.dayBarContainer, 
                      { height: Math.max(((day.amount / 200) * 100), 10) }
                    ]}
                  >
                    <View 
                      style={[
                        styles.dayBar, 
                        day.amount > 0 ? styles.activeBar : styles.inactiveBar
                      ]} 
                    />
                  </View>
                  <Text style={styles.dayAmount}>${day.amount.toFixed(0)}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.cashoutButton}>
            <Text style={styles.cashoutText}>Cash Out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyButton}>
            <Text style={styles.historyText}>View Earnings History</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <FlatList
          data={earningsData.transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.transactionsList}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFD600',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
  },
  earningsSummary: {
    backgroundColor: '#FFD600',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  dailyEarnings: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  daysContainer: {
    paddingRight: 20,
  },
  dayCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 45,
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dayBarContainer: {
    width: 8,
    borderRadius: 4,
    backgroundColor: '#EEE',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  dayBar: {
    width: '100%',
    borderRadius: 4,
  },
  activeBar: {
    backgroundColor: '#FFD600',
    height: '100%',
  },
  inactiveBar: {
    backgroundColor: '#DDDDDD',
    height: 10,
  },
  dayAmount: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  cashoutButton: {
    backgroundColor: '#FFD600',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  cashoutText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  historyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  transactionsList: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default EarningsScreen; 