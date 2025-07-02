
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './src/screens/theme';
import { ThemedText } from './ThemedText';

export function CycleProgress({ currentDay, totalDays, phase }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  const progress = (currentDay / totalDays) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold" style={[styles.title, { color: theme.subtitle }]}>
          Cycle Progress
        </ThemedText>
        <ThemedText type="default" style={[styles.dayText, { color: theme.primary }]}>
          Day {currentDay} of {totalDays}
        </ThemedText>
      </View>
      
      <View style={[styles.progressContainer, { backgroundColor: theme.divider }]}>
        <View 
          style={[
            styles.progressBar,
            { 
              width: `${progress}%`,
              backgroundColor: theme.primary
            }
          ]} 
        />
      </View>
      
      <ThemedText type="default" style={[styles.phaseText, { color: theme.description }]}>
        {phase} Phase
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  phaseText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
