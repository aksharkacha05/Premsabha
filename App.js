import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from './config/theme';
import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

// Import authentication screens
import LoginAuth from './Auth/LoginAuth';
import SignUp from './Auth/SignUp';

// Import main tab navigator
import MainTabNavigator from './navigation/MainTabNavigator';

// Import individual screens for stack navigation
import PdfViewerScreen from './screens/PdfViewerScreen';

import { getUserSession } from './Auth/session';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Request notification permissions on app start
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Enable notifications to receive reminders!');
      }
    };
    requestPermissions();

    // Schedule Thursday and Sunday notifications
    const scheduleSabhaNotifications = async () => {
      await Notifications.cancelAllScheduledNotificationsAsync();
      // Thursday 9:00 AM
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'પ્રેમસભા યાદી',
          body: 'જય સ્વામિનારાયણ!\nઆજે સભા છે, કૃપા કરીને અવશ્ય આવજો રાત્રે ૮:૩૦ થી  ૯:૩૦',
        },
        trigger: {
          weekday: 4, // Thursday (1=Sunday, 7=Saturday)
          hour: 9,
          minute: 0,
          repeats: true,
        },
      });
      // Sunday 9:00 AM
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'પ્રેમસભા યાદી',
          body: 'જય સ્વામિનારાયણ!\nઆજે સભા છે, કૃપા કરીને અવશ્ય આવજો સાંજે ૫ થી ૭',
        },
        trigger: {
          weekday: 1, // Sunday
          hour: 9,
          minute: 0,
          repeats: true,
        },
      });
    };
    scheduleSabhaNotifications();

    // Check for stored user session
    const checkSession = async () => {
      const user = await getUserSession();
      setInitialRoute(user ? 'MainApp' : 'Login');
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return null; // Or a splash/loading screen
  }

  // Helper to schedule a daily notification at a specific time
  // Usage: scheduleDailyNotification('08:00', 'Time for your daily kirtan!')
  const scheduleDailyNotification = async (time, message) => {
    const [hour, minute] = time.split(':').map(Number);
    await Notifications.cancelAllScheduledNotificationsAsync(); // Only one for now
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Premsabha Reminder',
        body: message,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={themeColors.primary} />
      <Stack.Navigator
        initialRouteName={initialRoute}
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
