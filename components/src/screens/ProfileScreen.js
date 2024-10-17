import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '../../ThemedText';


const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [aboutMe, setAboutMe] = useState('');

  const handleImagePicker = async () => {
    // Ask the user for permission to access the camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture Section */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: profileImage || 'https://your-image-url.com/pic.jpg' }} // Replace with a default image if no image is uploaded
          style={styles.profilePicture}
        />
        <Button title="Upload Profile Picture" onPress={handleImagePicker} color="#FF7F7F" />
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

      {/* About Me Section */}
      <View style={styles.aboutMeContainer}>
        <ThemedText type="defaultSemiBold" style={styles.aboutMeTitle}>
          About Me
        </ThemedText>
        <TextInput
          style={styles.aboutMeInput}
          placeholder="Write a short bio about yourself"
          multiline
          numberOfLines={4}
          value={aboutMe}
          onChangeText={setAboutMe}
        />
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
    marginBottom: 10,
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
  aboutMeContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  aboutMeTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  aboutMeInput: {
    height: 100,
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
  },
});

export default ProfileScreen;
