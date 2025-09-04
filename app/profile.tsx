import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  memberSince: "2023",
  totalBookings: 12,
  totalReviews: 8,
  preferences: {
    notifications: true,
    emailUpdates: true,
    locationServices: false,
    darkMode: false,
  },
};

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View className="mb-6">
    <Text className="text-lg font-bold text-gray-800 mb-3">{title}</Text>
    {children}
  </View>
);

const ProfileItem = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightComponent,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-xl p-4 mb-3 border border-gray-100 flex-row items-center"
  >
    <View className="bg-cyan-100 w-10 h-10 rounded-full items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color="#0891b2" />
    </View>
    
    <View className="flex-1">
      <Text className="text-base font-medium text-gray-800">{title}</Text>
      {subtitle && (
        <Text className="text-sm text-gray-600 mt-1">{subtitle}</Text>
      )}
    </View>
    
    {rightComponent ? (
      rightComponent
    ) : showArrow ? (
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    ) : null}
  </TouchableOpacity>
);

const SwitchItem = ({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 flex-row items-center">
    <View className="bg-cyan-100 w-10 h-10 rounded-full items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color="#0891b2" />
    </View>
    
    <View className="flex-1">
      <Text className="text-base font-medium text-gray-800">{title}</Text>
      {subtitle && (
        <Text className="text-sm text-gray-600 mt-1">{subtitle}</Text>
      )}
    </View>
    
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#e5e7eb", true: "#0891b2" }}
      thumbColor={value ? "#ffffff" : "#ffffff"}
    />
  </View>
);

export default function Profile() {
  const [user, setUser] = useState(mockUser);
  const [preferences, setPreferences] = useState(user.preferences);

 const handleEditProfile = () => {
    // Navigate to edit profile screen
    router.push("/profile");
  };

 const handleViewBookings = () => {
    router.push("/profile");
  };

  const handleViewFavorites = () => {
    router.push("/profile");
  };

  const handlePaymentMethods = () => {
    // Navigate to payment methods screen
    Alert.alert("Payment Methods", "This feature is coming soon!");
  };

  const handleHelpSupport = () => {
    // Navigate to help and support screen
    Alert.alert("Help & Support", "This feature is coming soon!");
  };

  const handlePrivacyPolicy = () => {
    // Navigate to privacy policy screen
    Alert.alert("Privacy Policy", "This feature is coming soon!");
  };

  const handleTermsOfService = () => {
    // Navigate to terms of service screen
    Alert.alert("Terms of Service", "This feature is coming soon!");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // Handle logout logic
            Alert.alert("Logged Out", "You have been successfully logged out.");
          },
        },
      ]
    );
  };

  const updatePreference = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-cyan-600 px-6 pt-12 pb-8">
        <View className="items-center">
          <Image
            source={{ uri: user.avatar }}
            className="w-24 h-24 rounded-full border-4 border-white mb-4"
          />
          <Text className="text-white text-2xl font-bold mb-1">{user.name}</Text>
          <Text className="text-cyan-100 text-base mb-3">{user.email}</Text>
          
          <View className="flex-row space-x-6">
            <View className="items-center">
              <Text className="text-white text-xl font-bold">{user.totalBookings}</Text>
              <Text className="text-cyan-100 text-sm">Bookings</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">{user.totalReviews}</Text>
              <Text className="text-cyan-100 text-sm">Reviews</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">{user.memberSince}</Text>
              <Text className="text-cyan-100 text-sm">Member Since</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Profile Actions */}
      <View className="px-6 -mt-6 mb-6">
        <TouchableOpacity
          onPress={handleEditProfile}
          className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200 flex-row items-center justify-center"
        >
          <Ionicons name="create" size={20} color="#0891b2" />
          <Text className="text-cyan-600 font-medium ml-2">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <View className="px-6">
        <ProfileSection title="Account">
          <ProfileItem
            icon="person"
            title="Personal Information"
            subtitle="Name, email, phone number"
            onPress={handleEditProfile}
          />
          
          <ProfileItem
            icon="card"
            title="Payment Methods"
            subtitle="Credit cards, PayPal"
            onPress={handlePaymentMethods}
          />
          
          <ProfileItem
            icon="location"
            title="Saved Addresses"
            subtitle="Home, work, favorite places"
            onPress={() => Alert.alert("Saved Addresses", "This feature is coming soon!")}
          />
        </ProfileSection>

        {/* Travel Section */}
        <ProfileSection title="Travel">
          <ProfileItem
            icon="calendar"
            title="My Bookings"
            subtitle={`${user.totalBookings} total bookings`}
            onPress={handleViewBookings}
          />
          
          <ProfileItem
            icon="heart"
            title="My Favorites"
            subtitle="Saved properties"
            onPress={handleViewFavorites}
          />
          
          <ProfileItem
            icon="star"
            title="My Reviews"
            subtitle={`${user.totalReviews} reviews written`}
            onPress={() => Alert.alert("My Reviews", "This feature is coming soon!")}
          />
        </ProfileSection>

        {/* Preferences Section */}
        <ProfileSection title="Preferences">
          <SwitchItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Booking updates and reminders"
            value={preferences.notifications}
            onValueChange={(value) => updatePreference('notifications', value)}
          />
          
          <SwitchItem
            icon="mail"
            title="Email Updates"
            subtitle="Newsletters and promotions"
            value={preferences.emailUpdates}
            onValueChange={(value) => updatePreference('emailUpdates', value)}
          />
          
          <SwitchItem
            icon="location"
            title="Location Services"
            subtitle="Find properties near you"
            value={preferences.locationServices}
            onValueChange={(value) => updatePreference('locationServices', value)}
          />
          
          <SwitchItem
            icon="moon"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            value={preferences.darkMode}
            onValueChange={(value) => updatePreference('darkMode', value)}
          />
        </ProfileSection>

        {/* Support Section */}
        <ProfileSection title="Support">
          <ProfileItem
            icon="help-circle"
            title="Help & Support"
            subtitle="Get help with your bookings"
            onPress={handleHelpSupport}
          />
          
          <ProfileItem
            icon="document-text"
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={handlePrivacyPolicy}
          />
          
          <ProfileItem
            icon="document"
            title="Terms of Service"
            subtitle="Our terms and conditions"
            onPress={handleTermsOfService}
          />
        </ProfileSection>

        {/* Logout Section */}
        <ProfileSection title="">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 rounded-xl p-4 border border-red-200 flex-row items-center justify-center"
          >
            <Ionicons name="log-out" size={20} color="#dc2626" />
            <Text className="text-red-600 font-medium ml-2">Logout</Text>
          </TouchableOpacity>
        </ProfileSection>

        {/* App Version */}
        <View className="items-center py-6">
          <Text className="text-gray-400 text-sm">App Version 1.0.0</Text>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </ScrollView>
  );
}
