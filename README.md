# RideWave Driver App

Mobile application for ride-sharing service drivers built with React Native and Expo.

## Features

- **Driver Authentication**: Login and registration for drivers
- **Online/Offline Toggle**: Ability to go online and offline to accept ride requests
- **Location Tracking**: Real-time GPS location tracking
- **Ride Management**: Accept, start, and complete rides
- **Earnings Dashboard**: View daily earnings and ride statistics
- **Map Integration**: Interactive maps showing pickup and dropoff locations

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.

2. Clone the repository:
   ```
   git clone https://github.com/tahir-sigmadevelopers/taxi-driver-side.git
   ```

3. Navigate to the driver app directory:
   ```
   cd driver
   ```

4. Install dependencies:
   ```
   npm install
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Use the Expo Go app on your mobile device to scan the QR code, or run on an emulator.

## Build and Deploy

### Android

To build an APK for Android:

```
npx expo build:android -t apk
```

### iOS

To build for iOS:

```
npx expo build:ios
```

## Project Structure

```
driver/
  ├── src/
  │   ├── assets/         # Images, fonts and other static assets
  │   ├── components/     # Reusable UI components
  │   ├── screens/        # Application screens
  │   │   ├── auth/       # Authentication related screens
  │   │   ├── home/       # Home screen and dashboard
  │   │   ├── ride/       # Ride management screens
  │   ├── config/         # Configuration files
  ├── App.js              # Main application component
  ├── app.json            # Expo configuration
  ├── package.json        # Dependencies and scripts
```

## Dependencies

This app uses the same SDK version and dependencies as the user app, including:

- React Native: ^0.76.7
- Expo: ~52.0.36
- React Navigation
- React Native Maps
- Expo Location
- Firebase Authentication
- And others (see package.json for the complete list)

## License

[Add license information here] 
