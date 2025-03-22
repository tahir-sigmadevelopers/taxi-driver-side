import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from 'react-native-vector-icons';

// Import screens
import HomeScreen from '../screens/main/HomeScreen';
import RidesScreen from '../screens/main/RidesScreen';
import EarningsScreen from '../screens/main/EarningsScreen';
import AccountScreen from '../screens/main/AccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stacks for each tab
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    {/* Add other Home-related screens here */}
  </Stack.Navigator>
);

const RidesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RidesMain" component={RidesScreen} />
    {/* Add other Rides-related screens here */}
  </Stack.Navigator>
);

const EarningsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="EarningsMain" component={EarningsScreen} />
    {/* Add other Earnings-related screens here */}
  </Stack.Navigator>
);

const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountMain" component={AccountScreen} />
    {/* Add other Account-related screens here */}
  </Stack.Navigator>
);

// Main Tab Navigator
const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rides') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFD600',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Rides" component={RidesStack} />
      <Tab.Screen name="Earnings" component={EarningsStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};

export default AppStack; 