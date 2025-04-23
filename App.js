import React, { useState, useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AppStack from './src/navigation/AppStack';
import AuthStack from './src/navigation/AuthStack';
import RideInProgressScreen from './src/screens/app/RideInProgressScreen';
import DirectionScreen from './src/screens/app/DirectionScreen';
import ArrivalScreen from './src/screens/app/ArrivalScreen';
import OTPVerificationScreen from './src/screens/app/OTPVerificationScreen';
import DestinationScreen from './src/screens/app/DestinationScreen';
import CashCollectionScreen from './src/screens/app/CashCollectionScreen';
import RateRiderScreen from './src/screens/app/RateRiderScreen';
import HomeScreen from './src/screens/app/HomeScreen';
import ProfileScreen from './src/screens/app/ProfileDetailsScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import EarningsScreen from './src/screens/app/EarningsScreen';
import RidesScreen from './src/screens/app/RidesScreen';
import SettingsScreen from './src/screens/app/SettingsScreen';
import NotificationScreen from './src/screens/app/NotificationScreen';
import CarsScreen from './src/screens/app/CarsScreen';
import CarDocumentsScreen from './src/screens/app/CarDocumentsScreen';
import RideRequestsScreen from './src/screens/app/RideRequestsScreen';

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
const Tab = createBottomTabNavigator();

// Main app tabs
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="History" component={RidesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

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
                <RootStack.Screen name="Main" component={MainTabs} />
                <RootStack.Screen name="RideInProgressScreen" component={RideInProgressScreen} />
                <RootStack.Screen name="RideRequestsScreen" component={RideRequestsScreen} />
                <RootStack.Screen name="DirectionScreen" component={DirectionScreen} />
                <RootStack.Screen name="ArrivalScreen" component={ArrivalScreen} />
                <RootStack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
                <RootStack.Screen name="RideCompleteScreen" component={CashCollectionScreen} />
                <RootStack.Screen name="RatingScreen" component={RateRiderScreen} />
                <RootStack.Screen name="DestinationScreen" component={DestinationScreen} />
                <RootStack.Screen name="Settings" component={SettingsScreen} />
                <RootStack.Screen name="Notifications" component={NotificationScreen} />
                <RootStack.Screen name="Vehicle" component={CarsScreen} />
                <RootStack.Screen name="Documents" component={CarDocumentsScreen} />
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