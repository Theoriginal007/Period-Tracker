
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './theme';
import { ThemedText } from '../../ThemedText';
import { ThemedCard } from '../../ThemedCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const menuItems = [
    { 
      icon: 'account-edit', 
      title: 'Edit Profile', 
      subtitle: 'Update your personal information',
      onPress: () => navigation.navigate('EditProfile')
    },
    { 
      icon: 'cog', 
      title: 'Settings', 
      subtitle: 'App preferences and notifications',
      onPress: () => navigation.navigate('AccessSettings')
    },
    { 
      icon: 'calendar-heart', 
      title: 'Cycle Settings', 
      subtitle: 'Customize your cycle tracking',
      onPress: () => console.log('Cycle Settings pressed')
    },
    { 
      icon: 'shield-check', 
      title: 'Privacy', 
      subtitle: 'Data protection and security',
      onPress: () => navigation.navigate('PrivacyPolicy')
    },
    { 
      icon: 'bell', 
      title: 'Notifications', 
      subtitle: 'Manage your reminders',
      onPress: () => console.log('Notifications pressed')
    },
    { 
      icon: 'export-variant', 
      title: 'Export Data', 
      subtitle: 'Download your cycle data',
      onPress: () => console.log('Export Data pressed')
    },
    { 
      icon: 'help-circle', 
      title: 'Help & Support', 
      subtitle: 'FAQs and contact support',
      onPress: () => console.log('Help & Support pressed')
    },
    { 
      icon: 'information', 
      title: 'About', 
      subtitle: 'App version and information',
      onPress: () => navigation.navigate('AboutSettings')
    },
  ];

  const stats = [
    { label: 'Cycles Tracked', value: '12', icon: 'calendar-check' },
    { label: 'Days Logged', value: '156', icon: 'calendar-today' },
    { label: 'Symptoms Tracked', value: '48', icon: 'clipboard-list' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <ThemedCard>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: theme.primaryLight }]}>
              <MaterialCommunityIcons
                name="account"
                size={48}
                color={theme.primary}
              />
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="title" style={[styles.name, { color: theme.title }]}>
                Sarah Johnson
              </ThemedText>
              <ThemedText type="default" style={[styles.email, { color: theme.description }]}>
                sarah.johnson@email.com
              </ThemedText>
              <TouchableOpacity 
                style={[styles.editButton, { borderColor: theme.primary }]}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <ThemedText type="default" style={[styles.editButtonText, { color: theme.primary }]}>
                  Edit Profile
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ThemedCard>

        {/* Statistics */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Your Activity
          </ThemedText>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: theme.primaryLight }]}>
                  <MaterialCommunityIcons
                    name={stat.icon}
                    size={24}
                    color={theme.primary}
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: theme.title }]}>
                  {stat.value}
                </ThemedText>
                <ThemedText type="default" style={[styles.statLabel, { color: theme.description }]}>
                  {stat.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedCard>

        {/* Menu Items */}
        <ThemedCard>
          <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: theme.title }]}>
            Account & Settings
          </ThemedText>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { borderBottomColor: theme.border }]}
              onPress={item.onPress}
            >
              <View style={[styles.menuIcon, { backgroundColor: theme.primaryLight }]}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={20}
                  color={theme.primary}
                />
              </View>
              <View style={styles.menuContent}>
                <ThemedText type="defaultSemiBold" style={[styles.menuTitle, { color: theme.text }]}>
                  {item.title}
                </ThemedText>
                <ThemedText type="default" style={[styles.menuSubtitle, { color: theme.description }]}>
                  {item.subtitle}
                </ThemedText>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={theme.textLight}
              />
            </TouchableOpacity>
          ))}
        </ThemedCard>

        {/* App Version */}
        <ThemedCard>
          <View style={styles.versionContainer}>
            <ThemedText type="default" style={[styles.versionText, { color: theme.description }]}>
              Period Tracker v1.0.0
            </ThemedText>
            <ThemedText type="default" style={[styles.buildText, { color: theme.textLight }]}>
              Build 2025.07.02
            </ThemedText>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 12,
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buildText: {
    fontSize: 12,
  },
});

export default ProfileScreen;
