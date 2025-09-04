import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Mock data for favorite properties
const mockFavorites = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, City Center",
    price: "$120/night",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Kitchen", "Pool", "Gym"],
    addedDate: "2024-01-15",
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
    addedDate: "2024-01-10",
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
    addedDate: "2024-01-05",
  },
];

const FavoriteCard = ({ property, onPress, onRemove }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
  >
    <View className="relative">
      <Image
        source={{ uri: property.image }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={onRemove}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm"
      >
        <Ionicons name="heart" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
    
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
      
      <View className="flex-row items-center justify-between">
        <View className="flex-row flex-wrap flex-1">
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
        
        <View className="ml-2">
          <Text className="text-xs text-gray-500">
            Added {new Date(property.addedDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const EmptyState = () => (
  <View className="flex-1 justify-center items-center px-8">
    <View className="bg-gray-100 w-24 h-24 rounded-full items-center justify-center mb-6">
      <Ionicons name="heart" size={48} color="#9ca3af" />
    </View>
    <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
      No favorites yet
    </Text>
    <Text className="text-gray-600 text-center mb-8 leading-6">
      Start exploring properties and save your favorites to see them here
    </Text>
    <TouchableOpacity
      onPress={() => router.push("/search")}
      className="bg-cyan-600 px-8 py-4 rounded-full"
    >
      <Text className="text-white font-bold text-lg">Explore Properties</Text>
    </TouchableOpacity>
  </View>
);

export default function Favorites() {
  const [favorites, setFavorites] = useState(mockFavorites);

  const handlePropertyPress = (propertyId) => {
    router.push(`/property/${propertyId}`);
  };

  const handleRemoveFavorite = (propertyId) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this property from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setFavorites(favorites.filter(fav => fav.id !== propertyId));
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;
    
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all properties from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            setFavorites([]);
          },
        },
      ]
    );
  };

  if (favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-800">
            My Favorites ({favorites.length})
          </Text>
          <TouchableOpacity
            onPress={handleClearAll}
            className="bg-red-100 px-4 py-2 rounded-full"
          >
            <Text className="text-red-600 font-medium">Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Favorites List */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FavoriteCard
            property={item}
            onPress={() => handlePropertyPress(item.id)}
            onRemove={() => handleRemoveFavorite(item.id)}
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
