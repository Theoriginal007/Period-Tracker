
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { format, isValid } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { lightTheme, darkTheme } from './theme';
import { ThemedText } from '../../ThemedText';
import { ThemedCard } from '../../ThemedCard';
import { PhaseIndicator } from '../../PhaseIndicator';
import { CycleProgress } from '../../CycleProgress';
import { TipsCard } from '../../TipsCard';
import { CalendarGrid } from '../../CalendarGrid';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CalendarScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodStart, setPeriodStart] = useState(new Date());
  const [periodEnd, setPeriodEnd] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const tips = [
    "Perfect time to start new projects",
    "Focus on iron-rich foods like spinach and lentils", 
    "Stay hydrated and get plenty of rest"
  ];

  const periodDays = [3, 4, 5, 6, 7];
  const ovulationDays = [14, 15];

  useLayoutEffect(() => {
    navigation.setOptions({ 
      headerTitle: 'Period💅',
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTintColor: theme.title,
    });
  }, [navigation, theme]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <ThemedCard>
          <View style={styles.headerContent}>
            <View style={styles.greetingContainer}>
              <ThemedText type="title" style={[styles.greeting, { color: theme.title }]}>
                Calendar
              </ThemedText>
              <TouchableOpacity 
                style={[styles.calendarIcon, { backgroundColor: theme.primaryLight }]}
                onPress={() => navigation.navigate('Log')}
              >
                <MaterialCommunityIcons 
                  name="plus" 
                  size={24} 
                  color={theme.primary} 
                />
              </TouchableOpacity>
            </View>
            <ThemedText type="default" style={[styles.subtitle, { color: theme.description }]}>
              Track your cycle and view predictions
            </ThemedText>
          </View>
        </ThemedCard>

        {/* Phase Indicator */}
        <ThemedCard>
          <PhaseIndicator 
            phase="Follicular Phase"
            description="Your energy is building up"
            icon="star-four-points"
          />
          
          <CycleProgress 
            currentDay={8}
            totalDays={28}
            phase="Follicular"
          />
        </ThemedCard>

        {/* Calendar Month View */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.monthTitle, { color: theme.title }]}>
            June 2025
          </ThemedText>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.primary }]} />
              <ThemedText type="default" style={{ color: theme.text }}>Period</ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.secondary }]} />
              <ThemedText type="default" style={{ color: theme.text }}>Ovulation</ThemedText>
            </View>
          </View>
          
          <CalendarGrid
            month={5}
            year={2025}
            periodDays={periodDays}
            ovulationDays={ovulationDays}
          />
        </ThemedCard>

        {/* Date Pickers */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Period Tracking
          </ThemedText>
          
          <TouchableOpacity 
            style={[styles.dateButton, { borderColor: theme.border }]}
            onPress={() => setShowStartPicker(true)}
          >
            <ThemedText type="default" style={{ color: theme.text }}>
              Last Period: {format(periodStart, 'MMM dd, yyyy')}
            </ThemedText>
            <MaterialCommunityIcons name="chevron-right" size={20} color={theme.description} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.dateButton, { borderColor: theme.border }]}
            onPress={() => setShowEndPicker(true)}
          >
            <ThemedText type="default" style={{ color: theme.text }}>
              Next Expected: {format(periodEnd, 'MMM dd, yyyy')}
            </ThemedText>
            <MaterialCommunityIcons name="chevron-right" size={20} color={theme.description} />
          </TouchableOpacity>
        </ThemedCard>

        {/* Tips Card */}
        <ThemedCard>
          <TipsCard tips={tips} />
        </ThemedCard>
      </ScrollView>

      {/* Date Picker Modals */}
      {showStartPicker && (
        <DateTimePicker
          value={periodStart}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate && isValid(selectedDate)) {
              setPeriodStart(selectedDate);
            }
          }}
        />
      )}
      
      {showEndPicker && (
        <DateTimePicker
          value={periodEnd}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate && isValid(selectedDate)) {
              setPeriodEnd(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  headerContent: {
    marginBottom: 4,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarIcon: {
    padding: 12,
    borderRadius: 12,
  },
  subtitle: {
    fontSize: 16,
  },
  monthTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
});

export default CalendarScreen;
