
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './src/screens/theme';
import { ThemedText } from './ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function TipsCard({ tips }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={[styles.title, { color: theme.title }]}>
        Tips for Today:
      </ThemedText>
      
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipItem}>
          <MaterialCommunityIcons 
            name="circle-small" 
            size={20} 
            color={theme.primary} 
            style={styles.bullet}
          />
          <ThemedText type="default" style={[styles.tipText, { color: theme.text }]}>
            {tip}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 4,
    marginTop: -2,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
});
