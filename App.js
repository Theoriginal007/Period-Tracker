import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarScreen from './components/src/screens/CalendarScreen';
import Encyclopedia from './components/src/screens/Encyclopedia';
import AccessSettings from './components/src/screens/AccessSettings';
import ProfileScreen from './components/src/screens/ProfileScreen';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';
import { Picker } from '@react-native-picker/picker';



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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Profile') {
                iconName = 'account-outline';
              } else if (route.name === 'Calendar') {
                iconName = 'calendar';
              } else if (route.name === 'Encyclopedia') {
                iconName = 'book-outline';
              } else if (route.name === 'Settings') {
                iconName = 'cog-outline';
              }
              return <Icon name={iconName} color={color} size={size} />;
            },
          })}
        >
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Encyclopedia" component={Encyclopedia} />
          <Tab.Screen name="Settings" component={AccessSettings} />
        </Tab.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  // Add your styles here
});
