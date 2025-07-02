
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './src/screens/theme';
import { ThemedText } from './ThemedText';

export function CalendarGrid({ month, year, periodDays = [], ovulationDays = [] }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const calendar = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendar.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendar.push(day);
  }

  const getDayStyle = (day) => {
    if (!day) return {};
    
    if (periodDays.includes(day)) {
      return { backgroundColor: theme.primary };
    }
    if (ovulationDays.includes(day)) {
      return { backgroundColor: theme.secondary };
    }
    return {};
  };

  const getDayTextColor = (day) => {
    if (!day) return theme.textLight;
    if (periodDays.includes(day) || ovulationDays.includes(day)) {
      return 'white';
    }
    return theme.text;
  };

  return (
    <View style={styles.container}>
      {/* Days of week header */}
      <View style={styles.weekHeader}>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.dayHeader}>
            <ThemedText type="default" style={[styles.dayHeaderText, { color: theme.textLight }]}>
              {day}
            </ThemedText>
          </View>
        ))}
      </View>
      
      {/* Calendar grid */}
      <View style={styles.calendarGrid}>
        {calendar.map((day, index) => (
          <View key={index} style={styles.dayCell}>
            {day && (
              <View style={[styles.dayButton, getDayStyle(day)]}>
                <ThemedText
                  type="default"
                  style={[styles.dayText, { color: getDayTextColor(day) }]}
                >
                  {day}
                </ThemedText>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    padding: 2,
  },
  dayButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
