import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import auth from '@react-native-firebase/auth';
import MainTabs from './MainTabs';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<auth.FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    // Replace this with your actual sign-in/sign-up component
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
      </Stack>
    );
  }

  return <MainTabs />;
}
