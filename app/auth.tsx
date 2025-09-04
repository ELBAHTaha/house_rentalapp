import React, { useState } from "react";
import { app } from "../src/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border rounded p-2 mb-2 w-80"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border rounded p-2 mb-2 w-80"
      />
      <TouchableOpacity
        className="bg-blue-500 text-white py-2 px-4 rounded mb-2 w-80"
        onPress={async () => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error: any) {
            alert(error.message);
          }
        }}
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 text-white py-2 px-4 rounded w-80"
        onPress={async () => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error: any) {
            alert(error.message);
          }
        }}
      >
        <Text className="text-white">Register</Text>
      </TouchableOpacity>
    </View>
  );
}