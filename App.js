import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarScreen from './components/src/screens/CalendarScreen';
import Encyclopedia from './components/src/screens/Encyclopedia';
import AccessSettings from './components/src/screens/Settings/AccessSettings';
import ProfileScreen from './components/src/screens/ProfileScreen';
import AboutSettings from './components/src/screens/Settings/AboutSettings';
import PrivacyPolicy from './components/src/screens/Settings/PrivacyPolicy';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./locales/en.json') },
      es: { translation: require('./locales/es.json') },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

// Create Tab and Stack Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Settings Stack Navigator
const SettingsStack = () => (
  <Stack.Navigator initialRouteName="AccessSettings">
    <Stack.Screen name="AccessSettings" component={AccessSettings} options={{ title: 'Settings' }} />
    <Stack.Screen name="AboutSettings" component={AboutSettings} options={{ title: 'About Settings' }} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} />
  </Stack.Navigator>
);

// Main App Component
const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Profile':
                  iconName = 'account-outline';
                  break;
                case 'Calendar':
                  iconName = 'calendar';
                  break;
                case 'Encyclopedia':
                  iconName = 'book-outline';
                  break;
                case 'Settings':
                  iconName = 'cog-outline';
                  break;
                default:
                  iconName = 'help-circle-outline';
              }
              return <Icon name={iconName} color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Encyclopedia" component={Encyclopedia} />
          <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default App;
