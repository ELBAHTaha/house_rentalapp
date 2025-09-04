import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

// Mock data for properties
const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, City Center",
    price: "$120/night",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Kitchen", "Pool", "Gym"],
  },
  {
    id: 2,
    title: "Cozy Beach House",
    location: "Beachfront, Coastal Area",
    price: "$200/night",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    amenities: ["Beach Access", "BBQ", "Ocean View", "Parking"],
  },
  {
    id: 3,
    title: "Luxury Mountain Cabin",
    location: "Mountain Range, Wilderness",
    price: "$150/night",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    amenities: ["Fireplace", "Hiking Trails", "Scenic View", "Hot Tub"],
  },
];

const PropertyCard = ({ property, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
    style={{ width: width * 0.85 }}
  >
    <Image
      source={{ uri: property.image }}
      className="w-full h-48"
      resizeMode="cover"
    />
    <View className="p-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">
          {property.title}
        </Text>
        <Text className="text-lg font-bold text-cyan-600">
          {property.price}
        </Text>
      </View>
      
      <View className="flex-row items-center mb-2">
        <Ionicons name="location" size={16} color="#64748b" />
        <Text className="text-gray-600 ml-1 text-sm">
          {property.location}
        </Text>
      </View>
      
      <View className="flex-row items-center mb-3">
        <Ionicons name="star" size={16} color="#fbbf24" />
        <Text className="text-gray-700 ml-1 font-medium">
          {property.rating}
        </Text>
        <Text className="text-gray-500 ml-1">
          ({property.reviews} reviews)
        </Text>
      </View>
      
      <View className="flex-row flex-wrap">
        {property.amenities.slice(0, 3).map((amenity, index) => (
          <View
            key={index}
            className="bg-gray-100 px-2 py-1 rounded-full mr-2 mb-1"
          >
            <Text className="text-xs text-gray-600">{amenity}</Text>
          </View>
        ))}
        {property.amenities.length > 3 && (
          <View className="bg-gray-100 px-2 py-1 rounded-full">
            <Text className="text-xs text-gray-600">
              +{property.amenities.length - 3} more
            </Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePropertyPress = (propertyId) => {
    // Navigate to property details
    router.push(`/property/${propertyId}`);
  };

  const handleSearchPress = () => {
    router.push("/search");
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-cyan-600 px-6 pt-12 pb-8">
        <Text className="text-white text-2xl font-bold mb-2">
          Find Your Perfect Stay
        </Text>
        <Text className="text-cyan-100 text-base">
          Discover amazing properties for your next adventure
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 -mt-6 mb-6">
        <TouchableOpacity
          onPress={handleSearchPress}
          className="bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200 flex-row items-center"
        >
          <Ionicons name="search" size={20} color="#64748b" />
          <Text className="text-gray-400 ml-3 text-base">
            Search destinations, properties...
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Quick Actions
        </Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center flex-1 mr-3">
            <View className="bg-cyan-100 w-12 h-12 rounded-full items-center justify-center mb-2">
              <Ionicons name="calendar" size={24} color="#0891b2" />
            </View>
            <Text className="text-sm font-medium text-gray-700">Book Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center flex-1 ml-3">
            <View className="bg-cyan-100 w-12 h-12 rounded-full items-center justify-center mb-2">
              <Ionicons name="heart" size={24} color="#0891b2" />
            </View>
            <Text className="text-sm font-medium text-gray-700">Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Properties */}
      <View className="px-6 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">
            Featured Properties
          </Text>
          <TouchableOpacity onPress={() => router.push("/search")}>
            <Text className="text-cyan-600 font-medium">View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Popular Destinations */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Popular Destinations
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {["Beach", "Mountain", "City", "Countryside"].map((destination, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3"
              style={{ width: "48%" }}
            >
              <View className="bg-cyan-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                <Ionicons
                  name={
                    destination === "Beach" ? "water" :
                    destination === "Mountain" ? "triangle" :
                    destination === "City" ? "business" : "leaf"
                  }
                  size={20}
                  color="#0891b2"
                />
              </View>
              <Text className="font-medium text-gray-700">{destination}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bottom Spacing */}
      <View className="h-20" />
    </ScrollView>
  );
}
