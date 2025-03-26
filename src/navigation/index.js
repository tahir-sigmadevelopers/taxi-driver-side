import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import RideInProgressScreen from '../screens/app/RideInProgressScreen';
import CancelRideScreen from '../screens/app/CancelRideScreen';
import CancellationSuccessScreen from '../screens/app/CancellationSuccessScreen';
import NotificationScreen from '../screens/app/NotificationScreen';

// For future auth state management
// import auth from '../services/auth';

const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    // This would typically involve checking a token in AsyncStorage
    // or using a service like Firebase Auth
    
    // Simulating auth check
    const checkAuth = async () => {
      try {
        // const user = await auth.getCurrentUser();
        // setIsAuthenticated(!!user);
        setIsAuthenticated(false); // Set to false to start with login screen
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // You could return a splash screen or loading indicator here
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <RootStack.Screen name="App" component={AppStack} />
            {/* Add screens at root level for direct access */}
            <RootStack.Screen 
              name="RideInProgressScreen" 
              component={RideInProgressScreen} 
            />
            <RootStack.Screen 
              name="CancelRideScreen" 
              component={CancelRideScreen} 
            />
            <RootStack.Screen 
              name="CancellationSuccessScreen" 
              component={CancellationSuccessScreen} 
            />
            <RootStack.Screen 
              name="NotificationScreen" 
              component={NotificationScreen} 
            />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 