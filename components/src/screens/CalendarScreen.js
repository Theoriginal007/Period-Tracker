import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { format, isValid } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

const PrideScreen = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodStart, setPeriodStart] = useState(new Date());
  const [periodEnd, setPeriodEnd] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  // Set the title of the header
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: 'Period💅' }); // Header title
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Last Period Start: {format(periodStart, 'yyyy-MM-dd')}</Text>
        <Text style={styles.headerText}>Expected Next Period Start: {format(periodEnd, 'yyyy-MM-dd')}</Text>
      </View>

      <FlatList
        data={getDaysInMonth()}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text style={styles.dayText}>{format(item, 'dd')}</Text>
          </TouchableOpacity>
        )}
        numColumns={7}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)}>
          <Text style={styles.input}>Select Last Period Start Date</Text>
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
          <Text style={styles.input}>Select Expected Next Period Start Date</Text>
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    textAlign: 'center',
  },
  dayText: {
    padding: 10,
    textAlign: 'center',
  },
});

export default PrideScreen;
