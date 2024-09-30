import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingComponent from "../components/LoadingComponent";

const DriverHomeScreen = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated data for driver's stats
  const [driverStats, setDriverStats] = useState({
    tripsTaken: 0,
    amountEarned: 0,
    rating: 0,
  });

  // Simulated data for available trips
  const fetchAvailableTrips = async () => {
    // Simulating a network request with a timeout
    setTimeout(() => {
      const tripRequests = [
        { id: "1", location: "Gate", destination: "Roundabout", price: 100 },
        { id: "2", location: "Market", destination: "School", price: 150 },
        { id: "3", location: "Hospital", destination: "Market", price: 200 },
        // Add more trip requests as needed
      ];
      setTrips(tripRequests);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchAvailableTrips();

    // Simulated driver stats
    setDriverStats({
      tripsTaken: 5,
      amountEarned: 450,
      rating: 4.5,
    });
  }, []);

  const selectTrip = (trip) => {
    navigation.navigate("TripDetailsScreen", { trip });
  };

  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting;

  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem} onPress={() => selectTrip(item)}>
      <Text style={styles.tripText}>
        {item.location} to {item.destination} - Price: ${item.price}
      </Text>

      <TouchableOpacity
        style={styles.requestButton}
        onPress={() => selectTrip(item)}
      >
        <Text style={styles.requestButtonText}>Accept Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Hi, {"\n"} {greeting}
          </Text>
        </View>

        <View>
          <Image
            source={require("../assets/driver.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </View>

      {/* Driver Stats Section */}
      {/* <Text style={styles.statsTitle}>Your Stats</Text> */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Trips Taken</Text>
          <Text style={styles.statValue}>{driverStats.tripsTaken}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Amount Earned</Text>
          <Text style={styles.statValue}>${driverStats.amountEarned}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Rating</Text>
          <Text style={styles.statValue}>{driverStats.rating} ★</Text>
        </View>
      </View>

      {/* Available Trips Section */}
      <View style={styles.availableTripsContainer}>
        <Text style={styles.availableTripsTitle}>Available Trip Requests</Text>
        {loading ? (
          <LoadingComponent />
        ) : (
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id}
            renderItem={renderTripItem}
            contentContainerStyle={styles.tripList}
          />
        )}
      </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: "#0e1724",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 21,
    fontFamily: "PoppinsBold",
    color: "#fff",
  },
  statsContainer: {
    backgroundColor: "#f7f7f7",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  statItem: {
    justifyContent: "space-between",
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#0e1724",
  },
  statLabel: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  statValue: {
    color: "#fff",

    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  availableTripsContainer: {
    flex: 1,
    padding: 10,
  },
  availableTripsTitle: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  tripList: {
    paddingBottom: 20,
  },
  tripItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tripText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },

  requestButton: {
    width: "100%",
    backgroundColor: "#0e1724",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  requestButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DriverHomeScreen;
