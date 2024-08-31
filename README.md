# Welcome

This project is a simple demo for creating an offline-first React Native app with Expo Go.

## Create our first Expo project

Here is a quick guide for how we created our first demo app.

```sh
# Navigate to the apps directory
cd apps

# Create a new Expo project
npx create-expo-app demo-expo-offline-first
:::
✅ Your project is ready!

To run your project, navigate to the directory and run one of the following npm commands.

- cd demo-expo-offline-first
- npm run android
- npm run ios
- npm run web

# Navigate to the directory
cd demo-expo-offline-first

# Run the app
npm start
:::
› Metro waiting on exp://192.168.0.8:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:8081

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.

```

Once the app is running, you should be able to scan the QR code with your phone to open the app or visit the URL in the browser - [http://localhost:8081](http://localhost:8081)in this example.

### Install the required packages

```sh
# Install the required packages for React Native development, navigation, and offline capabilities
npm install @react-native-async-storage/async-storage react-native-offline @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context

# Install the required packages for API calls
npm install axios

# Install the required packages for state management and offline capabilities with Redux
npm install @reduxjs/toolkit redux-persist redux-offline

# Install the required packages for SQLite
npm install expo-sqlite

```
