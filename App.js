import React, { useState, useEffect } from 'react';
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

// Create context for authentication with default values
export const AuthContext = React.createContext({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {}
});

// Mock authentication service
export const authService = {
  isAuthenticated: true, // Set to true to initially show Main stack instead of Auth
  login: (callback) => {
    authService.isAuthenticated = true;
    callback && callback();
  },
  logout: (callback) => {
    authService.isAuthenticated = false;
    callback && callback();
  }
};

const RootStack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to false to show Auth screens first
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      // Simulate checking authentication status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set initial auth state based on authService
      setIsAuthenticated(false); // Set to false to require login
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Create authentication context value
  const authContext = React.useMemo(() => ({
    signIn: () => {
      console.log("Signing in... (App.js)");
      try {
        authService.login(() => {
          console.log("Login callback executed");
          setIsAuthenticated(true);
        });
      } catch (error) {
        console.error("Error during sign in:", error);
      }
    },
    signOut: () => {
      console.log("Signing out... (App.js)");
      try {
        authService.logout(() => {
          console.log("Logout callback executed");
          setIsAuthenticated(false);
        });
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    },
    signUp: () => {
      console.log("Signing up... (App.js)");
      try {
        authService.login(() => {
          console.log("Signup callback executed");
          setIsAuthenticated(true);
        });
      } catch (error) {
        console.error("Error during sign up:", error);
      }
    },
  }), []);

  if (isLoading) {
    // Could show a loading screen here
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
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
    </AuthContext.Provider>
  );
} 