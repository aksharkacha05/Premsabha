import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from './config/theme';

// Import authentication screens
import LoginAuth from './Auth/LoginAuth';
import SignUp from './Auth/SignUp';

// Import main tab navigator
import MainTabNavigator from './navigation/MainTabNavigator';

// Import individual screens for stack navigation
import PdfViewerScreen from './screens/PdfViewerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={themeColors.primary} />
      <Stack.Navigator
        initialRouteName="MainApp"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: themeColors.backgroundDark },
        }}
      >
        {/* Authentication Stack */}
        <Stack.Screen 
          name="Login" 
          component={LoginAuth}
          options={{ 
            title: 'Login',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp}
          options={{ 
            title: 'Sign Up',
            headerShown: false,
          }}
        />
        
        {/* Main App Stack */}
        <Stack.Screen 
          name="MainApp" 
          component={MainTabNavigator}
          options={{ 
            title: 'Sabha App',
            headerShown: false,
          }}
        />
        
        {/* Modal Screens */}
        <Stack.Screen 
          name="PdfViewer" 
          component={PdfViewerScreen}
          options={{ 
            title: 'PDF Viewer',
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
