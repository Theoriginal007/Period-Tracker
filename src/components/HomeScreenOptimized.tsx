
import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { format } from 'date-fns';
import { lightTheme, darkTheme } from './src/screens/theme';
import { ThemedText } from '../ThemedText';
import { ThemedCard } from '../ThemedCard';
import { PhaseIndicator } from '../PhaseIndicator';
import { CycleProgress } from '../CycleProgress';
import { TipsCard } from '../TipsCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreenOptimized = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => 
    colorScheme === 'dark' ? darkTheme : lightTheme, 
    [colorScheme]
  );
  
  const currentDate = useMemo(() => new Date(), []);
  const tips = useMemo(() => [
    "Perfect time to start new projects",
    "Focus on iron-rich foods like spinach and lentils", 
    "Stay hydrated and get plenty of rest"
  ], []);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
      color: theme.title,
    },
    subtitle: {
      fontSize: 16,
      color: theme.description,
    },
    addButton: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: theme.primaryLight,
    },
  }), [theme]);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Header Card */}
        <ThemedCard>
          <View style={styles.headerContent}>
            <View style={styles.greetingContainer}>
              <ThemedText type="title" style={styles.greeting}>
                Hello Beautiful! 💅
              </ThemedText>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('Log')}
              >
                <MaterialCommunityIcons 
                  name="plus" 
                  size={24} 
                  color={theme.primary} 
                />
              </TouchableOpacity>
            </View>
            <ThemedText type="default" style={styles.subtitle}>
              {format(currentDate, 'EEEE, MMMM do')}
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

        {/* Tips Card */}
        <ThemedCard>
          <TipsCard tips={tips} />
        </ThemedCard>
      </ScrollView>
    </View>
  );
};

export default React.memo(HomeScreenOptimized);
