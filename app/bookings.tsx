import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern Downtown Apartment",
    propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    location: "Downtown, City Center",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    totalPrice: 360,
    status: "upcoming", // upcoming, active, completed, cancelled
    guests: 2,
    confirmationCode: "BK2024001",
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Cozy Beach House",
    propertyImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    location: "Beachfront, Coastal Area",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    totalPrice: 1000,
    status: "completed",
    guests: 4,
    confirmationCode: "BK2024002",
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Luxury Mountain Cabin",
    propertyImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    location: "Mountain Range, Wilderness",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    totalPrice: 750,
    status: "upcoming",
    guests: 3,
    confirmationCode: "BK2024003",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "upcoming":
      return { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" };
    case "active":
      return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" };
    case "completed":
      return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
    case "cancelled":
      return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "upcoming":
      return "Upcoming";
    case "active":
      return "Active";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
};

const BookingCard = ({ booking, onPress, onCancel }) => {
  const statusStyle = getStatusColor(booking.status);
  const isUpcoming = booking.status === "upcoming";
  const isActive = booking.status === "active";
  
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
    >
      <View className="flex-row">
        <Image
          source={{ uri: booking.propertyImage }}
          className="w-24 h-24"
          resizeMode="cover"
        />
        
        <View className="flex-1 p-4">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">
              {booking.propertyTitle}
            </Text>
            <View className={`px-3 py-1 rounded-full border ${statusStyle.bg} ${statusStyle.border}`}>
              <Text className={`text-xs font-medium ${statusStyle.text}`}>
                {getStatusText(booking.status)}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center mb-2">
            <Ionicons name="location" size={16} color="#64748b" />
            <Text className="text-gray-600 ml-1 text-sm">
              {booking.location}
            </Text>
          </View>
          
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar" size={16} color="#64748b" />
            <Text className="text-gray-600 ml-1 text-sm">
              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
            </Text>
          </View>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="people" size={16} color="#64748b" />
              <Text className="text-gray-600 ml-1 text-sm">
                {booking.guests} guest{booking.guests > 1 ? 's' : ''}
              </Text>
            </View>
            
            <Text className="text-lg font-bold text-cyan-600">
              ${booking.totalPrice}
            </Text>
          </View>
          
          <Text className="text-xs text-gray-500 mt-2">
            Confirmation: {booking.confirmationCode}
          </Text>
        </View>
      </View>
      
      {/* Action Buttons */}
      {isUpcoming && (
        <View className="flex-row border-t border-gray-100">
          <TouchableOpacity
            onPress={onCancel}
            className="flex-1 py-3 border-r border-gray-100"
          >
            <Text className="text-red-600 text-center font-medium">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/property/${booking.propertyId}`)}
            className="flex-1 py-3"
          >
            <Text className="text-cyan-600 text-center font-medium">View Property</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {isActive && (
        <View className="flex-row border-t border-gray-100">
          <TouchableOpacity
            onPress={() => router.push(`/property/${booking.propertyId}`)}
            className="flex-1 py-3 border-r border-gray-100"
          >
            <Text className="text-cyan-600 text-center font-medium">View Property</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3">
            <Text className="text-cyan-600 text-center font-medium">Contact Host</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const EmptyState = () => (
  <View className="flex-1 justify-center items-center px-8">
    <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
      <Ionicons name="calendar" size={48} color="#9ca3af" />
    </View>
    <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
      No bookings yet
    </Text>
    <Text className="text-gray-600 text-center mb-8 leading-6">
      Start exploring properties and make your first booking to see them here
    </Text>
    <TouchableOpacity
      onPress={() => router.push("/search")}
      className="bg-cyan-600 px-8 py-4 rounded-full"
    >
      <Text className="text-white font-bold text-lg">Explore Properties</Text>
    </TouchableOpacity>
  </View>
);

export default function Bookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { key: "all", label: "All", count: bookings.length },
    { key: "upcoming", label: "Upcoming", count: bookings.filter(b => b.status === "upcoming").length },
    { key: "active", label: "Active", count: bookings.filter(b => b.status === "active").length },
    { key: "completed", label: "Completed", count: bookings.filter(b => b.status === "completed").length },
  ];

  const filteredBookings = selectedFilter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedFilter);

  const handleBookingPress = (bookingId) => {
    // Navigate to booking details
    router.push(`/booking/${bookingId}`);
  };

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking? This action cannot be undone.",
      [
        {
          text: "Keep Booking",
          style: "cancel",
        },
        {
          text: "Cancel Booking",
          style: "destructive",
          onPress: () => {
            setBookings(bookings.map(booking => 
              booking.id === bookingId 
                ? { ...booking, status: "cancelled" }
                : booking
            ));
          },
        },
      ]
    );
  };

  if (bookings.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          My Bookings ({bookings.length})
        </Text>
        
        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              onPress={() => setSelectedFilter(filter.key)}
              className={`px-4 py-2 rounded-full border mr-3 ${
                selectedFilter === filter.key
                  ? "bg-cyan-600 border-cyan-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedFilter === filter.key ? "text-white" : "text-gray-700"
                }`}
              >
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onPress={() => handleBookingPress(item.id)}
            onCancel={() => handleCancelBooking(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Spacing */}
      <View className="h-20" />
    </View>
  );
}
