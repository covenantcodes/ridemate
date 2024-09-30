// AvailableDriversScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Sample JSON data for available drivers
const availableDriversData = [
  {
    id: 1,
    name: "Driver 1",
    phoneNumber: "+1234567890",
    profilePic: require("../assets/driver.png"), // Add appropriate image path
  },
  {
    id: 2,
    name: "Driver 2",
    phoneNumber: "+0987654321",
    profilePic: require("../assets/driver.png"), // Add appropriate image path
  },
  {
    id: 3,
    name: "Driver 3",
    phoneNumber: "+1122334455",
    profilePic: require("../assets/driver.png"), // Add appropriate image path
  },
  {
    id: 4,
    name: "Driver 4",
    phoneNumber: "+2233445566",
    profilePic: require("../assets/driver.png"), // Add appropriate image path
  },
  {
    id: 5,
    name: "Driver 5",
    phoneNumber: "+3344556677",
    profilePic: require("../assets/driver.png"), // Add appropriate image path
  },
];

const AvailableDriversScreen = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={23} />
        </TouchableOpacity>
        <Text style={styles.title}>Your Trip Details</Text>
      </View>

      <FlatList
        data={availableDriversData} // Use the JSON data here
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.driverCard}>
            <Image source={item.profilePic} style={styles.profilePic} />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{item.name}</Text>
              <Text style={styles.driverPhoneNumber}>{item.phoneNumber}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 21,
    fontFamily: "PoppinsBold",
    marginLeft: 10,
  },

  jsonContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  jsonText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#333",
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2, // For shadow on Android
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
  },
  driverPhoneNumber: {
    fontSize: 16,
    color: "#666",
  },
});

export default AvailableDriversScreen;
