import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

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
        setIsAuthenticated(false); // Default to not authenticated for demo
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
          <RootStack.Screen name="App" component={AppStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 