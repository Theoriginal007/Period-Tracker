import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { ThemedText } from '../../ThemedText';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://your-image-url.com/pic.jpg' }} // Replace with a default image or user-uploaded image
          style={styles.profilePicture}
        />
        <ThemedText type="title" style={styles.profileName}>
          Laura Gachanja
        </ThemedText>
        <ThemedText type="subtitle" style={styles.profileUsername}>
          @laura_gachanja
        </ThemedText>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <ProfileDetailItem
          icon={<FontAwesome5 name="weight" size={24} color="#FF7F7F" />}
          label="Weight"
          value="65 kg"
        />
        <ProfileDetailItem
          icon={<MaterialIcons name="height" size={24} color="#FF7F7F" />}
          label="Height"
          value="170 cm"
        />
        <ProfileDetailItem
          icon={<Entypo name="location-pin" size={24} color="#FF7F7F" />}
          label="Country"
          value="Kenya"
        />
        <ProfileDetailItem
          icon={<FontAwesome5 name="venus-mars" size={24} color="#FF7F7F" />}
          label="Gender"
          value="Female"
        />
        <ProfileDetailItem
          icon={<FontAwesome5 name="calendar-day" size={24} color="#FF7F7F" />}
          label="Cycle Days"
          value="28 Days"
        />
      </View>

      {/* Additional Features */}
      <View style={styles.additionalFeatures}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          Additional Features
        </ThemedText>
        <View style={styles.featureList}>
          <TextInput
            style={styles.input}
            placeholder="Add health notes (e.g. symptoms, mood)"
            multiline
          />
          <View style={styles.featureItem}>
            <FontAwesome5 name="bell" size={24} color="#FF7F7F" />
            <ThemedText style={styles.featureText}>Set Cycle Reminders</ThemedText>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="settings" size={24} color="#FF7F7F" />
            <ThemedText style={styles.featureText}>Edit Profile</ThemedText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Helper Component for Profile Detail Items
const ProfileDetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    {icon}
    <View style={styles.detailTextContainer}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <ThemedText type="default">{value}</ThemedText>
    </View>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F7',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF7F7F',
  },
  profileName: {
    marginTop: 10,
    fontSize: 24,
  },
  profileUsername: {
    fontSize: 16,
    color: '#888',
  },
  detailsContainer: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 15,
  },
  additionalFeatures: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  featureList: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  featureText: {
    marginLeft: 15,
    fontSize: 16,
  },
  input: {
    height: 80,
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ProfileScreen;
