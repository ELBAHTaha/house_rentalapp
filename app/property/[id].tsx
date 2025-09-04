import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";

const { width } = Dimensions.get("window");

// Mock property data
const mockProperty = {
  id: 1,
  title: "Modern Downtown Apartment",
  location: "Downtown, City Center",
  price: 120,
  rating: 4.8,
  reviews: 127,
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  ],
  amenities: [
    "WiFi", "Kitchen", "Pool", "Gym", "Air Conditioning", 
    "Heating", "Washer", "Dryer", "Free Parking", "Balcony"
  ],
  description: "This modern apartment is located in the heart of downtown, offering stunning city views and easy access to all major attractions. The space features contemporary design, high-end appliances, and comfortable furnishings perfect for both business and leisure travelers.",
  host: {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 4.9,
    responseTime: "1 hour",
    superhost: true,
  },
  details: {
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    type: "Apartment",
    size: "85 sqm",
  },
  houseRules: [
    "No smoking",
    "No pets",
    "No parties or events",
    "Quiet hours 10 PM - 8 AM",
  ],
  reviews: [
    {
      id: 1,
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent location and very clean apartment. The host was very responsive and helpful. Highly recommend!",
    },
    {
      id: 2,
      user: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 4,
      date: "2024-01-10",
      comment: "Great stay! The apartment was exactly as described. Perfect for our weekend getaway.",
    },
  ],
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View className="relative">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            className="w-screen h-80"
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      
      {/* Image Indicators */}
      <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </View>
      
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-4 bg-white/90 p-2 rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>
      
      {/* Favorite Button */}
      <TouchableOpacity
        onPress={() => Alert.alert("Added to Favorites", "Property added to your favorites!")}
        className="absolute top-12 right-4 bg-white/90 p-2 rounded-full"
      >
        <Ionicons name="heart-outline" size={24} color="#374151" />
      </TouchableOpacity>
    </View>
  );
};

const AmenityItem = ({ amenity }) => (
  <View className="flex-row items-center mb-3">
    <View className="bg-cyan-100 w-8 h-8 rounded-full items-center justify-center mr-3">
      <Ionicons name="checkmark" size={16} color="#0891b2" />
    </View>
    <Text className="text-gray-700">{amenity}</Text>
  </View>
);

const ReviewItem = ({ review }) => (
  <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100">
    <View className="flex-row items-center mb-3">
      <Image
        source={{ uri: review.avatar }}
        className="w-12 h-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <Text className="font-medium text-gray-800">{review.user}</Text>
        <View className="flex-row items-center">
          <View className="flex-row items-center mr-2">
            {[...Array(5)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < review.rating ? "star" : "star-outline"}
                size={16}
                color={index < review.rating ? "#fbbf24" : "#d1d5db"}
              />
            ))}
          </View>
          <Text className="text-gray-500 text-sm">
            {new Date(review.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
    <Text className="text-gray-700 leading-6">{review.comment}</Text>
  </View>
);

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  const [property] = useState(mockProperty);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      Alert.alert("Select Dates", "Please select check-in and check-out dates.");
      return;
    }
    
    Alert.alert(
      "Confirm Booking",
      `Book ${property.title} for ${guests} guest${guests > 1 ? 's' : ''}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Book Now",
          onPress: () => {
            Alert.alert("Booking Confirmed!", "Your booking has been confirmed. Check your email for details.");
          },
        },
      ]
    );
  };

  const handleContactHost = () => {
    Alert.alert("Contact Host", "This feature is coming soon!");
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Image Carousel */}
      <ImageCarousel images={property.images} />
      
      <ScrollView className="flex-1">
        {/* Property Header */}
        <View className="bg-white p-6 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {property.title}
          </Text>
          
          <View className="flex-row items-center mb-3">
            <Ionicons name="location" size={16} color="#64748b" />
            <Text className="text-gray-600 ml-1">{property.location}</Text>
          </View>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text className="text-gray-700 ml-1 font-medium">
                {property.rating}
              </Text>
              <Text className="text-gray-500 ml-1">
                ({property.reviews.length} reviews)
              </Text>
            </View>
            
            <Text className="text-2xl font-bold text-cyan-600">
              ${property.price}/night
            </Text>
          </View>
        </View>

        {/* Property Details */}
        <View className="bg-white p-6 border-b border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            About this place
          </Text>
          
          <View className="flex-row flex-wrap mb-4">
            <View className="flex-row items-center mr-6 mb-2">
              <Ionicons name="bed" size={20} color="#64748b" />
              <Text className="text-gray-700 ml-2">
                {property.details.bedrooms} bedroom{property.details.bedrooms > 1 ? 's' : ''}
              </Text>
            </View>
            
            <View className="flex-row items-center mr-6 mb-2">
              <Ionicons name="water" size={20} color="#64748b" />
              <Text className="text-gray-700 ml-2">
                {property.details.bathrooms} bathroom{property.details.bathrooms > 1 ? 's' : ''}
              </Text>
            </View>
            
            <View className="flex-row items-center mr-6 mb-2">
              <Ionicons name="people" size={20} color="#64748b" />
              <Text className="text-gray-700 ml-2">
                Up to {property.details.guests} guests
              </Text>
            </View>
            
            <View className="flex-row items-center mb-2">
              <Ionicons name="home" size={20} color="#64748b" />
              <Text className="text-gray-700 ml-2">
                {property.details.size}
              </Text>
            </View>
          </View>
          
          <Text className="text-gray-700 leading-6">{property.description}</Text>
        </View>

        {/* Amenities */}
        <View className="bg-white p-6 border-b border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            What this place offers
          </Text>
          
          <View className="flex-row flex-wrap">
            {property.amenities.map((amenity, index) => (
              <View key={index} className="w-1/2">
                <AmenityItem amenity={amenity} />
              </View>
            ))}
          </View>
        </View>

        {/* Host Information */}
        <View className="bg-white p-6 border-b border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Hosted by {property.host.name}
          </Text>
          
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: property.host.avatar }}
              className="w-16 h-16 rounded-full mr-4"
            />
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="text-lg font-medium text-gray-800 mr-2">
                  {property.host.name}
                </Text>
                {property.host.superhost && (
                  <View className="bg-yellow-100 px-2 py-1 rounded-full">
                    <Text className="text-yellow-800 text-xs font-medium">Superhost</Text>
                  </View>
                )}
              </View>
              
              <View className="flex-row items-center mb-1">
                <Ionicons name="star" size={16} color="#fbbf24" />
                <Text className="text-gray-700 ml-1 font-medium">
                  {property.host.rating}
                </Text>
                <Text className="text-gray-500 ml-1">rating</Text>
              </View>
              
              <Text className="text-gray-600">
                Response time: {property.host.responseTime}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={handleContactHost}
            className="bg-gray-100 py-3 rounded-lg items-center"
          >
            <Text className="text-gray-800 font-medium">Contact Host</Text>
          </TouchableOpacity>
        </View>

        {/* House Rules */}
        <View className="bg-white p-6 border-b border-gray-100">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            House rules
          </Text>
          
          {property.houseRules.map((rule, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={16} color="#64748b" />
              <Text className="text-gray-700 ml-2">{rule}</Text>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <View className="bg-white p-6 border-b border-gray-100">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">
              {property.rating} · {property.reviews.length} reviews
            </Text>
            <TouchableOpacity>
              <Text className="text-cyan-600 font-medium">View all</Text>
            </TouchableOpacity>
          </View>
          
          {property.reviews.slice(0, 2).map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </View>

        {/* Booking Section */}
        <View className="bg-white p-6 mb-20">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Book your stay
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row space-x-3">
              <View className="flex-1">
                <Text className="text-gray-700 mb-2">Check-in</Text>
                <TextInput
                  placeholder="Select date"
                  value={checkIn}
                  onChangeText={setCheckIn}
                  className="border border-gray-300 rounded-lg px-3 py-3"
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 mb-2">Check-out</Text>
                <TextInput
                  placeholder="Select date"
                  value={checkOut}
                  onChangeText={setCheckOut}
                  className="border border-gray-300 rounded-lg px-3 py-3"
                />
              </View>
            </View>
            
            <View>
              <Text className="text-gray-700 mb-2">Guests</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-3">
                <TouchableOpacity
                  onPress={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="remove" size={20} color="#374151" />
                </TouchableOpacity>
                
                <Text className="flex-1 text-center text-lg font-medium">
                  {guests} guest{guests > 1 ? 's' : ''}
                </Text>
                
                <TouchableOpacity
                  onPress={() => setGuests(guests + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="add" size={20} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity
              onPress={handleBookNow}
              className="bg-cyan-600 py-4 rounded-lg items-center"
            >
              <Text className="text-white font-bold text-lg">Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
