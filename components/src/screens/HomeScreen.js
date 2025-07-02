
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';
import { ThemedText } from '../../ThemedText';
import { ThemedCard } from '../../ThemedCard';
import { PhaseIndicator } from '../../PhaseIndicator';
import { CycleProgress } from '../../CycleProgress';
import { TipsCard } from '../../TipsCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const screenWidth = Dimensions.get('window').width;
  
  const [greeting, setGreeting] = useState('');
  const [currentPhase, setCurrentPhase] = useState('Follicular Phase');
  const [currentDay, setCurrentDay] = useState(8);
  const [nextPeriodDays, setNextPeriodDays] = useState(20);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const quickActions = [
    {
      icon: 'clipboard-text',
      label: 'Log Today',
      color: theme.primary,
      onPress: () => navigation.navigate('Log')
    },
    {
      icon: 'calendar-month',
      label: 'Calendar',
      color: theme.secondary,
      onPress: () => navigation.navigate('Calendar')
    },
    {
      icon: 'chart-line',
      label: 'Insights',
      color: theme.accent,
      onPress: () => navigation.navigate('Insights')
    },
    {
      icon: 'heart',
      label: 'Wellness',
      color: theme.success,
      onPress: () => console.log('Wellness pressed')
    },
  ];

  const tips = [
    "Stay hydrated during your period",
    "Light exercise can help reduce cramps",
    "Track your mood patterns",
    "Get enough sleep for hormone balance"
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <ThemedCard>
          <View style={styles.headerContent}>
            <View style={styles.greetingContainer}>
              <View>
                <ThemedText type="title" style={[styles.greeting, { color: theme.title }]}>
                  {greeting}, Sarah! 💅
                </ThemedText>
                <ThemedText type="default" style={[styles.subtitle, { color: theme.description }]}>
                  How are you feeling today?
                </ThemedText>
              </View>
              <TouchableOpacity 
                style={[styles.notificationIcon, { backgroundColor: theme.primaryLight }]}
                onPress={() => console.log('Notifications pressed')}
              >
                <MaterialCommunityIcons 
                  name="bell" 
                  size={24} 
                  color={theme.primary} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </ThemedCard>

        {/* Current Phase */}
        <ThemedCard>
          <PhaseIndicator 
            phase={currentPhase}
            description="Your energy is building up"
            icon="star-four-points"
          />
          
          <CycleProgress 
            currentDay={currentDay}
            totalDays={28}
            phase="Follicular"
          />
        </ThemedCard>

        {/* Quick Stats */}
        <ThemedCard>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="calendar-heart" size={32} color={theme.primary} />
              <ThemedText type="defaultSemiBold" style={[styles.statNumber, { color: theme.title }]}>
                {nextPeriodDays}
              </ThemedText>
              <ThemedText type="default" style={[styles.statLabel, { color: theme.description }]}>
                Days until period
              </ThemedText>
            </View>
            
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="water" size={32} color={theme.secondary} />
              <ThemedText type="defaultSemiBold" style={[styles.statNumber, { color: theme.title }]}>
                12
              </ThemedText>
              <ThemedText type="default" style={[styles.statLabel, { color: theme.description }]}>
                Cycles tracked
              </ThemedText>
            </View>
            
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="chart-timeline-variant" size={32} color={theme.accent} />
              <ThemedText type="defaultSemiBold" style={[styles.statNumber, { color: theme.title }]}>
                28
              </ThemedText>
              <ThemedText type="default" style={[styles.statLabel, { color: theme.description }]}>
                Avg cycle length
              </ThemedText>
            </View>
          </View>
        </ThemedCard>

        {/* Quick Actions */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Quick Actions
          </ThemedText>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionButton, { backgroundColor: `${action.color}15` }]}
                onPress={action.onPress}
              >
                <MaterialCommunityIcons
                  name={action.icon}
                  size={32}
                  color={action.color}
                />
                <ThemedText type="default" style={[styles.actionLabel, { color: theme.text }]}>
                  {action.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedCard>

        {/* Today's Tips */}
        <ThemedCard>
          <TipsCard tips={tips} />
        </ThemedCard>

        {/* Recent Activity */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Recent Activity
          </ThemedText>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.primaryLight }]}>
                <MaterialCommunityIcons name="water-circle" size={20} color={theme.primary} />
              </View>
              <View style={styles.activityContent}>
                <ThemedText type="defaultSemiBold" style={{ color: theme.text }}>
                  Period started
                </ThemedText>
                <ThemedText type="default" style={{ color: theme.description }}>
                  3 days ago
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.secondaryLight || theme.primaryLight }]}>
                <MaterialCommunityIcons name="clipboard-text" size={20} color={theme.secondary} />
              </View>
              <View style={styles.activityContent}>
                <ThemedText type="defaultSemiBold" style={{ color: theme.text }}>
                  Symptoms logged
                </ThemedText>
                <ThemedText type="default" style={{ color: theme.description }}>
                  Yesterday
                </ThemedText>
              </View>
            </View>
          </View>
        </ThemedCard>
      </ScrollView>
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
  headerContent: {
    marginBottom: 8,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  notificationIcon: {
    padding: 12,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
});

export default HomeScreen;
