import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

// Mock data for properties
const allProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, City Center",
    price: 120,
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Kitchen", "Pool", "Gym"],
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: 2,
    title: "Cozy Beach House",
    location: "Beachfront, Coastal Area",
    price: 200,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    amenities: ["Beach Access", "BBQ", "Ocean View", "Parking"],
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 3,
    title: "Luxury Mountain Cabin",
    location: "Mountain Range, Wilderness",
    price: 150,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    amenities: ["Fireplace", "Hiking Trails", "Scenic View", "Hot Tub"],
    type: "Cabin",
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: 4,
    title: "Urban Loft Studio",
    location: "Arts District, Downtown",
    price: 95,
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    amenities: ["WiFi", "Kitchen", "Workspace", "Gym"],
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: 5,
    title: "Family Villa with Pool",
    location: "Suburban Area, Family District",
    price: 280,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    amenities: ["Pool", "Garden", "BBQ", "Parking", "WiFi"],
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
  },
];

const PropertyCard = ({ property, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
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
          ${property.price}/night
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
      
      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center mr-4">
          <Ionicons name="bed" size={16} color="#64748b" />
          <Text className="text-gray-600 ml-1 text-sm">
            {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}
          </Text>
        </View>
        <View className="flex-row items-center mr-4">
          <Ionicons name="water" size={16} color="#64748b" />
          <Text className="text-gray-600 ml-1 text-sm">
            {property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="home" size={16} color="#64748b" />
          <Text className="text-gray-600 ml-1 text-sm">
            {property.type}
          </Text>
        </View>
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

const FilterButton = ({ title, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full border ${
      active
        ? "bg-cyan-600 border-cyan-600"
        : "bg-white border-gray-300"
    }`}
  >
    <Text
      className={`font-medium ${
        active ? "text-white" : "text-gray-700"
      }`}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const propertyTypes = ["All", "Apartment", "House", "Cabin", "Studio", "Villa"];
  const priceRanges = ["All", "$0-100", "$100-200", "$200-300", "$300+"];

  const filteredProperties = allProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "" || selectedType === "All" || property.type === selectedType;
    const matchesPrice = priceRange === "" || priceRange === "All" || 
      (priceRange === "$0-100" && property.price <= 100) ||
      (priceRange === "$100-200" && property.price > 100 && property.price <= 200) ||
      (priceRange === "$200-300" && property.price > 200 && property.price <= 300) ||
      (priceRange === "$300+" && property.price > 300);
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const handlePropertyPress = (propertyId) => {
    router.push(`/property/${propertyId}`);
  };

  const clearFilters = () => {
    setSelectedType("");
    setPriceRange("");
    setSearchQuery("");
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Header */}
      <View className="bg-white px-6 pt-4 pb-4 border-b border-gray-200">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className="bg-cyan-600 p-2 rounded-lg mr-3"
          >
            <Ionicons name="filter" size={20} color="white" />
          </TouchableOpacity>
          
          <View className="flex-1">
            <TextInput
              placeholder="Search destinations, properties..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="bg-gray-100 px-4 py-3 rounded-lg text-base"
            />
          </View>
        </View>

        {/* Filter Chips */}
        {(selectedType !== "" || priceRange !== "") && (
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-600 mr-2">Filters:</Text>
            {selectedType !== "" && selectedType !== "All" && (
              <View className="bg-cyan-100 px-3 py-1 rounded-full mr-2">
                <Text className="text-cyan-800 text-sm">{selectedType}</Text>
              </View>
            )}
            {priceRange !== "" && priceRange !== "All" && (
              <View className="bg-cyan-100 px-3 py-1 rounded-full mr-2">
                <Text className="text-cyan-800 text-sm">{priceRange}</Text>
              </View>
            )}
            <TouchableOpacity onPress={clearFilters}>
              <Text className="text-cyan-600 font-medium">Clear</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Filters Section */}
      {showFilters && (
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Property Type
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {propertyTypes.map((type) => (
              <FilterButton
                key={type}
                title={type}
                active={selectedType === type}
                onPress={() => setSelectedType(type)}
              />
            ))}
          </ScrollView>

          <Text className="text-lg font-bold text-gray-800 mb-3">
            Price Range
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {priceRanges.map((range) => (
              <FilterButton
                key={range}
                title={range}
                active={priceRange === range}
                onPress={() => setPriceRange(range)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results Count */}
      <View className="px-6 py-3 bg-white border-b border-gray-200">
        <Text className="text-gray-600">
          {filteredProperties.length} properties found
        </Text>
      </View>

      {/* Properties List */}
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
