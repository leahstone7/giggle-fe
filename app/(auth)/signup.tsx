import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSignUp = () => {};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "android" ? "padding" : "height"}
    >
      <View>
        <View style={styles.card}>
          {/* HEADER */}
          <View>
            <Text
              style={{
                fontSize: 22,
                justifyContent: "center",
                paddingBottom: 12,
                alignItems: 'center'
              }}
            >
              {" "}
              Giggle
            </Text>
          </View>
          <View style={styles.formContainer}>
            {/* USERNAME INPUT */}
            <View>
              <Text>Username</Text>
            </View>
            <Ionicons name="person-outline" size={20} />
            <TextInput
              placeholder="John Smith"
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="none"
            />
          </View>
          {/* EMAIL INPUT */}
          <View>
            <Text>Email</Text>
            <View>
              <Ionicons name="mail-outline" size={20} />
              <TextInput
                placeholder="johncena@gmail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View>
              {/* input group styles */}
              <Text>Password</Text>
              <View>
                <Ionicons name="lock-closed-outline" size={20} />
                <TextInput
                  placeholder="********"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                  />
                </TouchableOpacity>
              </View>

              {/* SIGNUP BUTTON */}
              <TouchableOpacity
                onPress={handleSignUp}
                disabled={isLoading}
                style={{
                  alignItems: "center",
                  backgroundColor: "#68ca31",
                  padding: 16,
                  borderRadius: 10,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* FOOTER */}

              <View>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={{color: "green"}}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
