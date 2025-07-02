
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';
import { ThemedText } from '../../ThemedText';
import { ThemedCard } from '../../ThemedCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const InsightsScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const screenWidth = Dimensions.get('window').width;
  
  const [selectedPeriod, setSelectedPeriod] = useState('3months');

  const periods = [
    { key: '1month', label: '1M' },
    { key: '3months', label: '3M' },
    { key: '6months', label: '6M' },
    { key: '1year', label: '1Y' },
  ];

  const insights = [
    {
      title: 'Cycle Regularity',
      value: '92%',
      trend: 'up',
      description: 'Your cycles are very regular',
      icon: 'calendar-check',
      color: theme.success,
    },
    {
      title: 'Average Cycle Length',
      value: '28 days',
      trend: 'stable',
      description: 'Consistent with last 6 months',
      icon: 'calendar-clock',
      color: theme.primary,
    },
    {
      title: 'Symptom Frequency',
      value: '65%',
      trend: 'down',
      description: 'Reduced from last period',
      icon: 'chart-line',
      color: theme.secondary,
    },
    {
      title: 'Mood Patterns',
      value: 'Stable',
      trend: 'up',
      description: 'Positive trend this month',
      icon: 'emoticon-happy',
      color: theme.accent,
    },
  ];

  const symptoms = [
    { name: 'Cramps', frequency: 85, color: theme.error },
    { name: 'Bloating', frequency: 70, color: theme.warning },
    { name: 'Headache', frequency: 45, color: theme.secondary },
    { name: 'Fatigue', frequency: 60, color: theme.accent },
    { name: 'Mood Swings', frequency: 30, color: theme.primary },
  ];

  const predictions = [
    {
      title: 'Next Period',
      date: 'July 15, 2025',
      confidence: '95%',
      icon: 'calendar-heart',
    },
    {
      title: 'Fertile Window',
      date: 'July 8-12, 2025',
      confidence: '88%',
      icon: 'star-four-points',
    },
    {
      title: 'PMS Symptoms',
      date: 'July 12-14, 2025',
      confidence: '76%',
      icon: 'alert-circle',
    },
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'trending-neutral';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return theme.success;
      case 'down': return theme.error;
      default: return theme.textLight;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedCard>
          <View style={styles.headerContainer}>
            <View>
              <ThemedText type="title" style={[styles.title, { color: theme.title }]}>
                Insights
              </ThemedText>
              <ThemedText type="default" style={[styles.subtitle, { color: theme.description }]}>
                Track your patterns and trends
              </ThemedText>
            </View>
            <TouchableOpacity 
              style={[styles.exportButton, { backgroundColor: theme.primaryLight }]}
              onPress={() => console.log('Export insights')}
            >
              <MaterialCommunityIcons name="download" size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </ThemedCard>

        {/* Time Period Selector */}
        <ThemedCard>
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  {
                    backgroundColor: selectedPeriod === period.key ? theme.primary : 'transparent',
                    borderColor: theme.border,
                  }
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <ThemedText
                  type="default"
                  style={[
                    styles.periodButtonText,
                    { color: selectedPeriod === period.key ? 'white' : theme.text }
                  ]}
                >
                  {period.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedCard>

        {/* Key Insights */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Key Insights
          </ThemedText>
          <View style={styles.insightsGrid}>
            {insights.map((insight, index) => (
              <View key={index} style={[styles.insightCard, { backgroundColor: theme.cardBackground }]}>
                <View style={styles.insightHeader}>
                  <View style={[styles.insightIcon, { backgroundColor: `${insight.color}20` }]}>
                    <MaterialCommunityIcons
                      name={insight.icon}
                      size={24}
                      color={insight.color}
                    />
                  </View>
                  <MaterialCommunityIcons
                    name={getTrendIcon(insight.trend)}
                    size={20}
                    color={getTrendColor(insight.trend)}
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={[styles.insightValue, { color: theme.title }]}>
                  {insight.value}
                </ThemedText>
                <ThemedText type="default" style={[styles.insightTitle, { color: theme.text }]}>
                  {insight.title}
                </ThemedText>
                <ThemedText type="default" style={[styles.insightDescription, { color: theme.description }]}>
                  {insight.description}
                </ThemedText>
              </View>
            ))}
          </View>
        </ThemedCard>

        {/* Symptom Analysis */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Symptom Frequency
          </ThemedText>
          <View style={styles.symptomsContainer}>
            {symptoms.map((symptom, index) => (
              <View key={index} style={styles.symptomRow}>
                <View style={styles.symptomInfo}>
                  <ThemedText type="default" style={[styles.symptomName, { color: theme.text }]}>
                    {symptom.name}
                  </ThemedText>
                  <ThemedText type="default" style={[styles.symptomPercentage, { color: theme.description }]}>
                    {symptom.frequency}%
                  </ThemedText>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${symptom.frequency}%`,
                        backgroundColor: symptom.color,
                      }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </ThemedCard>

        {/* Predictions */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Predictions
          </ThemedText>
          <View style={styles.predictionsContainer}>
            {predictions.map((prediction, index) => (
              <View key={index} style={[styles.predictionCard, { borderColor: theme.border }]}>
                <View style={[styles.predictionIcon, { backgroundColor: theme.primaryLight }]}>
                  <MaterialCommunityIcons
                    name={prediction.icon}
                    size={20}
                    color={theme.primary}
                  />
                </View>
                <View style={styles.predictionContent}>
                  <ThemedText type="defaultSemiBold" style={[styles.predictionTitle, { color: theme.text }]}>
                    {prediction.title}
                  </ThemedText>
                  <ThemedText type="default" style={[styles.predictionDate, { color: theme.description }]}>
                    {prediction.date}
                  </ThemedText>
                </View>
                <View style={styles.confidenceContainer}>
                  <ThemedText type="default" style={[styles.confidenceText, { color: theme.success }]}>
                    {prediction.confidence}
                  </ThemedText>
                </View>
              </View>
            ))}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  exportButton: {
    padding: 12,
    borderRadius: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  periodButtonText: {
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  insightCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  symptomsContainer: {
    gap: 16,
  },
  symptomRow: {
    gap: 8,
  },
  symptomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symptomName: {
    fontSize: 16,
    fontWeight: '500',
  },
  symptomPercentage: {
    fontSize: 14,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  predictionsContainer: {
    gap: 12,
  },
  predictionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  predictionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  predictionContent: {
    flex: 1,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  predictionDate: {
    fontSize: 14,
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default InsightsScreen;
