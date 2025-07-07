import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from '../config/theme';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import PdfLibraryScreen from '../screens/PdfLibraryScreen';
import KirtanPlayerScreen from '../screens/KirtanPlayerScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PDF Library') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Kirtan Player') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeColors.accent,
        tabBarInactiveTintColor: themeColors.textMuted,
        tabBarStyle: {
          backgroundColor: themeColors.backgroundCard,
          borderTopWidth: 1,
          borderTopColor: themeColors.primaryDarker,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false, // Hide headers since screens have custom headers
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="PDF Library" 
        component={PdfLibraryScreen}
        options={{
          title: 'Library',
        }}
      />
      <Tab.Screen 
        name="Kirtan Player" 
        component={KirtanPlayerScreen}
        options={{
          title: 'Kirtans',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        children={(props) => <ProfileScreen {...props} user={props.route.params?.user} />} 
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator; 