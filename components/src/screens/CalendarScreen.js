import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, addMonths, subMonths, isSameMonth, isValid } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [markedDays, setMarkedDays] = useState([]);
  const [periodStart, setPeriodStart] = useState(new Date());
  const [periodEnd, setPeriodEnd] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Other header components */}
      </View>

      <FlatList
        data={getDaysInMonth()}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{format(item, 'dd')}</Text>
          </TouchableOpacity>
        )}
        numColumns={7}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <Text style={styles.input}>Start Date: {format(periodStart, 'yyyy-MM-dd')}</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => setShowEndPicker(true)}>
          <Text style={styles.input}>End Date: {format(periodEnd, 'yyyy-MM-dd')}</Text>
        </TouchableOpacity>
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
    </View>
  );
};

// Define your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    // Styles for header
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default CalendarScreen;
