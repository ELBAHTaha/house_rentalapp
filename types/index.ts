// Property Types
export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  amenities: string[];
  type: string;
  bedrooms: number;
  bathrooms: number;
  description?: string;
  host?: Host;
  details?: PropertyDetails;
  houseRules?: string[];
  reviews?: Review[];
}

export interface PropertyDetails {
  bedrooms: number;
  bathrooms: number;
  guests: number;
  type: string;
  size: string;
}

export interface Host {
  name: string;
  avatar: string;
  rating: number;
  responseTime: string;
  superhost: boolean;
}

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

// Booking Types
export interface Booking {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  guests: number;
  confirmationCode: string;
}

// User Types
export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  totalBookings: number;
  totalReviews: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  emailUpdates: boolean;
  locationServices: boolean;
  darkMode: boolean;
}

// Favorite Types
export interface Favorite {
  id: number;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  addedDate: string;
}

// Filter Types
export interface SearchFilters {
  query: string;
  propertyType: string;
  priceRange: string;
  amenities: string[];
  location: string;
}

// Navigation Types
export type RootTabParamList = {
  index: undefined;
  search: undefined;
  favorites: undefined;
  bookings: undefined;
  profile: undefined;
};

export type PropertyStackParamList = {
  'property/[id]': { id: string };
};

// Component Props Types
export interface PropertyCardProps {
  property: Property;
  onPress: (propertyId: number) => void;
}

export interface FavoriteCardProps {
  property: Favorite;
  onPress: (propertyId: number) => void;
  onRemove: (propertyId: number) => void;
}

export interface BookingCardProps {
  booking: Booking;
  onPress: (bookingId: number) => void;
  onCancel: (bookingId: number) => void;
}

export interface FilterButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

export interface ProfileItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

export interface SwitchItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Types
export interface BookingForm {
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}

export interface SearchForm {
  query: string;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  guests: number;
  filters: SearchFilters;
}

// Utility Types
export type StatusType = 'upcoming' | 'active' | 'completed' | 'cancelled';

export type PropertyType = 'Apartment' | 'House' | 'Cabin' | 'Studio' | 'Villa';

export type PriceRange = '$0-100' | '$100-200' | '$200-300' | '$300+';

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

