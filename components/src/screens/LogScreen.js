
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';
import { ThemedText } from '../../ThemedText';
import { ThemedCard } from '../../ThemedCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LogScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);

  const symptoms = [
    { id: 'cramps', icon: 'lightning-bolt', label: 'Cramps' },
    { id: 'headache', icon: 'head-outline', label: 'Headache' },
    { id: 'bloating', icon: 'balloon', label: 'Bloating' },
    { id: 'fatigue', icon: 'sleep', label: 'Fatigue' },
    { id: 'mood', icon: 'emoticon-sad', label: 'Mood Swings' },
    { id: 'acne', icon: 'face-woman-shimmer', label: 'Acne' },
  ];

  const moods = [
    { id: 'happy', icon: 'emoticon-happy', label: 'Happy', color: theme.success },
    { id: 'neutral', icon: 'emoticon-neutral', label: 'Neutral', color: theme.textLight },
    { id: 'sad', icon: 'emoticon-sad', label: 'Sad', color: theme.primary },
    { id: 'angry', icon: 'emoticon-angry', label: 'Angry', color: theme.error },
  ];

  const flowIntensities = ['Light', 'Medium', 'Heavy'];

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const saveLog = () => {
    Alert.alert(
      'Log Saved',
      'Your daily log has been saved successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <ThemedCard>
          <View style={styles.headerContainer}>
            <View>
              <ThemedText type="title" style={[styles.title, { color: theme.title }]}>
                Daily Log
              </ThemedText>
              <ThemedText type="default" style={[styles.subtitle, { color: theme.description }]}>
                Track your symptoms and mood today
              </ThemedText>
            </View>
            <TouchableOpacity 
              style={[styles.saveButton, { backgroundColor: theme.primary }]}
              onPress={saveLog}
            >
              <MaterialCommunityIcons name="check" size={20} color="white" />
              <ThemedText type="default" style={[styles.saveButtonText, { color: 'white' }]}>
                Save
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedCard>

        {/* Symptoms Tracking */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Symptoms
          </ThemedText>
          <View style={styles.symptomsGrid}>
            {symptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomButton,
                  {
                    backgroundColor: selectedSymptoms.includes(symptom.id) ? theme.primaryLight : theme.cardBackground,
                    borderColor: selectedSymptoms.includes(symptom.id) ? theme.primary : theme.border,
                  }
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <MaterialCommunityIcons
                  name={symptom.icon}
                  size={24}
                  color={selectedSymptoms.includes(symptom.id) ? theme.primary : theme.textLight}
                />
                <ThemedText
                  type="default"
                  style={[
                    styles.symptomText,
                    { color: selectedSymptoms.includes(symptom.id) ? theme.primary : theme.text }
                  ]}
                >
                  {symptom.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedCard>

        {/* Mood Tracking */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            How are you feeling?
          </ThemedText>
          <View style={styles.moodContainer}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodButton, 
                  { 
                    backgroundColor: selectedMood === mood.id ? `${mood.color}30` : `${mood.color}15`,
                    borderWidth: selectedMood === mood.id ? 2 : 0,
                    borderColor: mood.color,
                  }
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <MaterialCommunityIcons
                  name={mood.icon}
                  size={32}
                  color={mood.color}
                />
                <ThemedText
                  type="default"
                  style={[styles.moodText, { color: theme.text }]}
                >
                  {mood.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedCard>

        {/* Flow Intensity */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Flow Intensity
          </ThemedText>
          <View style={styles.flowContainer}>
            {flowIntensities.map((intensity, index) => (
              <TouchableOpacity
                key={intensity}
                style={[
                  styles.flowButton,
                  {
                    backgroundColor: selectedFlow === intensity ? theme.primaryLight : theme.cardBackground,
                    borderColor: selectedFlow === intensity ? theme.primary : theme.border,
                  }
                ]}
                onPress={() => setSelectedFlow(intensity)}
              >
                <View style={[
                  styles.flowDot, 
                  { 
                    backgroundColor: theme.primary, 
                    opacity: selectedFlow === intensity ? 1 : 0.3 
                  }
                ]} />
                <ThemedText
                  type="default"
                  style={[
                    styles.flowText,
                    { color: selectedFlow === intensity ? theme.primary : theme.text }
                  ]}
                >
                  {intensity}
                </ThemedText>
              </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  symptomButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  symptomText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  flowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flowButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  flowDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  flowText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LogScreen;
