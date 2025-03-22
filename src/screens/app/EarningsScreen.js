import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const EarningsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Earnings</Text>
        <Text style={styles.subtitle}>This screen will display your earnings history and stats.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
});

export default EarningsScreen; 