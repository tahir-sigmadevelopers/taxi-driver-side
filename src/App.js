import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

// Mock authentication service
const authService = {
  isAuthenticated: false,
  login: (callback) => {
    authService.isAuthenticated = true;
    callback();
  },
  logout: (callback) => {
    authService.isAuthenticated = false;
    callback();
  }
};

// Create root stack navigator that can hold both auth and app stacks
const RootStack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      // Simulate checking authentication status
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAuthenticated(authService.isAuthenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Could show a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={AppStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
} 