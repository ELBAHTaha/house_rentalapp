# 🏠 House Rental App

A modern, feature-rich house rental application built with React Native, Expo, and NativeWind (Tailwind CSS).

## ✨ Features

### 🏡 Property Management
- **Property Listings**: Browse available properties with detailed information
- **Search & Filters**: Advanced search with property type, price range, and location filters
- **Property Details**: Comprehensive property pages with image galleries, amenities, and reviews
- **Image Carousel**: Beautiful image galleries with navigation indicators

### 🔍 Search & Discovery
- **Smart Search**: Search by destination, property name, or location
- **Advanced Filters**: Filter by property type, price range, and amenities
- **Quick Actions**: Easy access to popular destinations and property types
- **Featured Properties**: Curated selection of top-rated properties

### ❤️ User Experience
- **Favorites System**: Save and manage favorite properties
- **User Profiles**: Complete user profiles with preferences and settings
- **Booking Management**: Track current, upcoming, and past bookings
- **Reviews & Ratings**: Read and write property reviews

### 📱 Modern UI/UX
- **Tab Navigation**: Intuitive bottom tab navigation
- **Responsive Design**: Optimized for all screen sizes
- **Beautiful Icons**: Consistent iconography using Ionicons
- **Smooth Animations**: Enhanced user interactions and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd house-rental-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🏗️ Project Structure

```
app/
├── _layout.tsx          # Root navigation layout
├── index.tsx            # Home screen with featured properties
├── search.tsx           # Search and filter screen
├── favorites.tsx        # User favorites management
├── bookings.tsx         # Booking history and management
├── profile.tsx          # User profile and settings
├── property/
│   └── [id].tsx        # Dynamic property details screen
└── globals.css          # Global Tailwind CSS styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#0891b2)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#fbbf24)
- **Error**: Red (#ef4444)
- **Background**: Light Gray (#f8fafc)

### Typography
- **Headings**: Bold, large text for titles
- **Body**: Regular weight for content
- **Captions**: Smaller text for metadata

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover states
- **Inputs**: Clean, accessible form elements
- **Navigation**: Intuitive tab-based navigation

## 🔧 Technology Stack

- **Frontend**: React Native 0.79.6
- **Navigation**: Expo Router 5.1.5
- **Styling**: NativeWind (Tailwind CSS) 4.1.23
- **Icons**: Expo Vector Icons
- **Development**: Expo SDK 53
- **Language**: TypeScript 5.8.3

## 📱 Screenshots

### Home Screen
- Featured properties carousel
- Quick action buttons
- Popular destinations
- Search functionality

### Search Screen
- Advanced filtering options
- Property type selection
- Price range filters
- Real-time search results

### Property Details
- Image gallery with carousel
- Comprehensive property information
- Amenities list
- Host details and reviews
- Booking form

### User Profile
- Personal information
- Booking history
- Favorites management
- App preferences
- Account settings

## 🚀 Future Enhancements

### Planned Features
- **Real-time Chat**: Direct messaging with hosts
- **Payment Integration**: Secure payment processing
- **Calendar Integration**: Advanced date selection
- **Push Notifications**: Booking reminders and updates
- **Offline Support**: Cache properties for offline viewing
- **Multi-language**: Internationalization support

### Technical Improvements
- **State Management**: Redux or Zustand integration
- **API Integration**: Backend service integration
- **Authentication**: Secure user authentication
- **Data Persistence**: Local storage and caching
- **Testing**: Unit and integration tests
- **Performance**: Image optimization and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team**: For the amazing development platform
- **React Native Community**: For continuous improvements
- **Tailwind CSS**: For the utility-first CSS framework
- **Unsplash**: For beautiful placeholder images

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](issues) page
2. Create a new issue with detailed description
3. Contact the development team

---

**Happy coding! 🎉**
