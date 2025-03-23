import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';

// Import screens
import HomeScreen from '../screens/app/HomeScreen';
import BookingScreen from '../screens/app/BookingScreen';
import EarningsScreen from '../screens/app/EarningsScreen';
import AccountScreen from '../screens/app/AccountScreen';
import RideInProgressScreen from '../screens/app/RideInProgressScreen';
import CashCollectionScreen from '../screens/app/CashCollectionScreen';
import RateRiderScreen from '../screens/app/RateRiderScreen';
import ProfileDetailsScreen from '../screens/app/ProfileDetailsScreen';
import PreBookedRidesScreen from '../screens/app/PreBookedRidesScreen';
import CancelRideScreen from '../screens/app/CancelRideScreen';
import CancellationSuccessScreen from '../screens/app/CancellationSuccessScreen';
import NotificationScreen from '../screens/app/NotificationScreen';
import UpdateDocumentDetailsScreen from '../screens/app/UpdateDocumentDetailsScreen';
import CarsScreen from '../screens/app/CarsScreen';
import CarDocumentsScreen from '../screens/app/CarDocumentsScreen';
import AddNewCarScreen from '../screens/app/AddNewCarScreen';
import CarPUCScreen from '../screens/app/CarPUCScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      key="MainTabNavigator"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FFD600',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          paddingTop: 5,
          height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Booking') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

// App stack navigator with screens that are above the tab navigator
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Standalone screens that need to be accessible from anywhere */}
      <Stack.Screen name="RideInProgressScreen" component={RideInProgressScreen} />
      <Stack.Screen name="CashCollectionScreen" component={CashCollectionScreen} />
      <Stack.Screen name="RateRiderScreen" component={RateRiderScreen} />
      <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
      <Stack.Screen name="PreBookedRidesScreen" component={PreBookedRidesScreen} />
      <Stack.Screen name="CancelRideScreen" component={CancelRideScreen} />
      <Stack.Screen name="CancellationSuccessScreen" component={CancellationSuccessScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="UpdateDocumentDetailsScreen" component={UpdateDocumentDetailsScreen} />
      <Stack.Screen name="CarsScreen" component={CarsScreen} />
      <Stack.Screen name="CarDocumentsScreen" component={CarDocumentsScreen} />
      <Stack.Screen name="AddNewCarScreen" component={AddNewCarScreen} />
      <Stack.Screen name="CarPUCScreen" component={CarPUCScreen} />
      
      {/* Main tab navigator */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppStack; 