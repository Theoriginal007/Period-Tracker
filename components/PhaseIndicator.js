
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './src/screens/theme';
import { ThemedText } from './ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function PhaseIndicator({ phase, description, progress, icon }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case 'Follicular Phase':
        return 'star-four-points';
      case 'Ovulation':
        return 'heart';
      case 'Luteal Phase':
        return 'moon-waning-crescent';
      case 'Menstrual Phase':
        return 'water-circle';
      default:
        return 'circle';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryLight }]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
        <MaterialCommunityIcons 
          name={icon || getPhaseIcon(phase)} 
          size={24} 
          color="white" 
        />
      </View>
      <View style={styles.textContainer}>
        <ThemedText type="defaultSemiBold" style={[styles.phase, { color: theme.title }]}>
          {phase}
        </ThemedText>
        <ThemedText type="default" style={[styles.description, { color: theme.description }]}>
          {description}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  phase: {
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
