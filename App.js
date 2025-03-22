import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';

// Ignore specific warnings (optional)
LogBox.ignoreLogs([
  'Reanimated 2',
  'Setting a timer',
  'Require cycle',
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Navigation />
    </SafeAreaProvider>
  );
} 