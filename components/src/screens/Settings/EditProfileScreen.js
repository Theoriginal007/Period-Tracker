
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme';
import { ThemedText } from '../../../ThemedText';
import { ThemedCard } from '../../../ThemedCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditProfileScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    age: '25',
    cycleLength: '28',
    periodLength: '5',
    phone: '+1 (555) 123-4567',
    emergencyContact: 'Mom - +1 (555) 987-6543',
  });

  const handleSave = () => {
    Alert.alert(
      'Profile Updated',
      'Your profile has been successfully updated!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Picture Section */}
        <ThemedCard>
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, { backgroundColor: theme.primaryLight }]}>
              <MaterialCommunityIcons
                name="account"
                size={64}
                color={theme.primary}
              />
            </View>
            <TouchableOpacity 
              style={[styles.changePhotoButton, { backgroundColor: theme.primary }]}
            >
              <ThemedText type="default" style={styles.changePhotoText}>
                Change Photo
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedCard>

        {/* Personal Information */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Personal Information
          </ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText type="default" style={[styles.label, { color: theme.text }]}>
              Full Name
            </ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              value={profile.name}
              onChangeText={(text) => updateProfile('name', text)}
              placeholder="Enter your full name"
              placeholderTextColor={theme.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText type="default" style={[styles.label, { color: theme.text }]}>
              Email Address
            </ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              value={profile.email}
              onChangeText={(text) => updateProfile('email', text)}
              placeholder="Enter your email"
              placeholderTextColor={theme.textLight}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText type="default" style={[styles.label, { color: theme.text }]}>
              Age
            </ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              value={profile.age}
              onChangeText={(text) => updateProfile('age', text)}
              placeholder="Enter your age"
              placeholderTextColor={theme.textLight}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText type="default" style={[styles.label, { color: theme.text }]}>
              Phone Number
            </ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              value={profile.phone}
              onChangeText={(text) => updateProfile('phone', text)}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.textLight}
              keyboardType="phone-pad"
            />
          </View>
        </ThemedCard>

        {/* Cycle Information */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Cycle Information
          </ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText type="default" style={[styles.label, { color: theme.text }]}>
              Average Cycle Length (days)
            </ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              value={profile.cycleLength}
              onChangeText={(text) => updateProfile('cycleLength', text)}
              placeholder="28"
              placeholderTextColor={theme.textLight}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText type="default" style={[styles.label, { color: theme.text }]}>
              Average Period Length (days)
            </ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              value={profile.periodLength}
              onChangeText={(text) => updateProfile('periodLength', text)}
              placeholder="5"
              placeholderTextColor={theme.textLight}
              keyboardType="numeric"
            />
          </View>
        </ThemedCard>

        {/* Emergency Contact */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Emergency Contact
          </ThemedText>
          
          <View style={styles.inputGroup}>
            <ThemedText type="default" style={[styles.label, { color: theme.text }]}>
              Emergency Contact
            </ThemedText>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              value={profile.emergencyContact}
              onChangeText={(text) => updateProfile('emergencyContact', text)}
              placeholder="Name - Phone Number"
              placeholderTextColor={theme.textLight}
            />
          </View>
        </ThemedCard>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: theme.primary }]}
            onPress={handleSave}
          >
            <ThemedText type="defaultSemiBold" style={styles.saveButtonText}>
              Save Changes
            </ThemedText>
          </TouchableOpacity>
        </View>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  changePhotoText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EditProfileScreen;
