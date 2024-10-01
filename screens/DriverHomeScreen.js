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
import { db } from "../services/config"; // Adjust the path as necessary
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const DriverHomeScreen = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated data for driver's stats
  const [driverStats, setDriverStats] = useState({
    tripsTaken: 0,
    amountEarned: 0,
    rating: 0,
  });

  // Fetch available trips from Firestore in real-time
  const fetchAvailableTrips = () => {
    try {
      const tripsRef = collection(db, "trips"); // Reference to the "trips" collection
      const unsubscribe = onSnapshot(tripsRef, (querySnapshot) => {
        const tripRequests = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data()); // Log the document ID and data
          tripRequests.push({ id: doc.id, ...doc.data() }); // Add doc ID and data
        });
        setTrips(tripRequests); // Update the state with the new trip data
        setLoading(false); // Stop loading once trips are fetched
      });

      // Cleanup the subscription when the component unmounts
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching trips: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = fetchAvailableTrips();

    // Simulated driver stats
    setDriverStats({
      tripsTaken: 5,
      amountEarned: 450,
      rating: 4.5,
    });

    // Cleanup listener when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe(); // Unsubscribe from Firestore real-time updates
      }
    };
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
        {item.currentLocation} to {item.selectedLocation} {"\n"}Price: ${item.price}
      </Text>

      <Text style={styles.tripText}>Vehicle Type: {item.vehicleType}</Text>

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
    backgroundColor: "#fff",
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
