import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import authentication screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import CompleteProfileScreen from '../screens/auth/CompleteProfileScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import PasswordSuccessScreen from '../screens/auth/PasswordSuccessScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';

// Import profile setup screens
import ProfilePictureScreen from '../screens/profile/ProfilePictureScreen';
import BankAccountDetailsScreen from '../screens/profile/BankAccountDetailsScreen';
import DrivingDetailsScreen from '../screens/profile/DrivingDetailsScreen';
import GovernmentIDScreen from '../screens/profile/GovernmentIDScreen';

// Location permission screen
import LocationPermissionScreen from '../screens/app/LocationPermissionScreen';

// Import App screens for direct navigation
import HomeScreen from '../screens/app/HomeScreen';
import RidesScreen from '../screens/app/RidesScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="PasswordSuccess" component={PasswordSuccessScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      
      {/* Profile setup screens */}
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
      <Stack.Screen name="BankAccountDetails" component={BankAccountDetailsScreen} />
      <Stack.Screen name="DrivingDetails" component={DrivingDetailsScreen} />
      <Stack.Screen name="GovernmentID" component={GovernmentIDScreen} />
      
      {/* Location permission as part of auth flow */}
      <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
      
      {/* Main app entry points */}
      <Stack.Screen name="Main" component={RidesScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack; 