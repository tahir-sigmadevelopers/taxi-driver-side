import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import RideInProgressScreen from './src/screens/app/RideInProgressScreen';
import DirectionScreen from './src/screens/app/DirectionScreen';
import ArrivalScreen from './src/screens/app/ArrivalScreen';
import OTPVerificationScreen from './src/screens/app/OTPVerificationScreen';
import DestinationScreen from './src/screens/app/DestinationScreen';
import CashCollectionScreen from './src/screens/app/CashCollectionScreen';
import RateRiderScreen from './src/screens/app/RateRiderScreen';

// Ignore specific warnings (optional)
LogBox.ignoreLogs([
  'Reanimated 2',
  'Setting a timer',
  'Require cycle',
]);

const RootStack = createNativeStackNavigator();

export default function App() {
  // For demo purposes, always show the app (not auth)
  const isAuthenticated = true;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <>
              <RootStack.Screen name="Main" component={AppStack} />
              <RootStack.Screen 
                name="RideInProgressScreen" 
                component={RideInProgressScreen} 
              />
              <RootStack.Screen 
                name="DirectionScreen" 
                component={DirectionScreen} 
              />
              <RootStack.Screen 
                name="ArrivalScreen" 
                component={ArrivalScreen} 
              />
              <RootStack.Screen 
                name="OTPVerificationScreen" 
                component={OTPVerificationScreen} 
              />
              <RootStack.Screen 
                name="DestinationScreen" 
                component={DestinationScreen} 
              />
              <RootStack.Screen 
                name="CashCollectionScreen" 
                component={CashCollectionScreen} 
              />
              <RootStack.Screen 
                name="RateRiderScreen" 
                component={RateRiderScreen} 
              />
            </>
          ) : (
            <RootStack.Screen name="Auth" component={AuthStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 