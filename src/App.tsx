
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { lightTheme, darkTheme } from './components/src/screens/theme';

// Import the screens
import HomeScreen from './components/src/screens/HomeScreen';
import CalendarScreen from './components/src/screens/CalendarScreen';
import LogScreen from './components/src/screens/LogScreen';
import InsightsScreen from './components/src/screens/InsightsScreen';
import ProfileScreen from './components/src/screens/ProfileScreen';

// Import settings screens for the profile stack
import AccessSettings from './components/src/screens/Settings/AccessSettings';
import AboutSettings from './components/src/screens/Settings/AboutSettings';
import PrivacyPolicy from './components/src/screens/Settings/PrivacyPolicy';
import EditProfileScreen from './components/src/screens/Settings/EditProfileScreen';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next with lazy loading for better performance
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('../locales/en.json') },
      es: { translation: require('../locales/es.json') },
      fr: { translation: require('../locales/fr.json') },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Profile Stack Navigator (includes settings)
const ProfileStack = React.memo(() => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.title,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profile' }} 
      />
      <Stack.Screen 
        name="AccessSettings" 
        component={AccessSettings} 
        options={{ title: 'Settings' }} 
      />
      <Stack.Screen 
        name="AboutSettings" 
        component={AboutSettings} 
        options={{ title: 'About' }} 
      />
      <Stack.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicy} 
        options={{ title: 'Privacy Policy' }} 
      />
    </Stack.Navigator>
  );
});

// Main App Component
const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                switch (route.name) {
                  case 'Home':
                    iconName = 'home-variant';
                    break;
                  case 'Calendar':
                    iconName = 'calendar-month';
                    break;
                  case 'Log':
                    iconName = 'clipboard-text';
                    break;
                  case 'Insights':
                    iconName = 'chart-line';
                    break;
                  case 'Profile':
                    iconName = 'account-circle';
                    break;
                  default:
                    iconName = 'help-circle-outline';
                }
                return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
              },
              tabBarActiveTintColor: theme.primary,
              tabBarInactiveTintColor: theme.textLight,
              tabBarStyle: {
                backgroundColor: theme.cardBackground,
                borderTopColor: theme.border,
                borderTopWidth: 1,
                height: 60,
                paddingBottom: 8,
                paddingTop: 8,
              },
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '500',
                marginBottom: 2,
              },
              headerShown: false,
              lazy: true,
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Log" component={LogScreen} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Profile" component={ProfileStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default App;
