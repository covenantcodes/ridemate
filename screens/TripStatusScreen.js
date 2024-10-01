import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import LoadingComponent from "../components/LoadingComponent";
import { db } from '../services/config';
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

const TripStatusScreen = ({ route, navigation }) => {
  const { trip } = route.params || {};
  
  // Initialize tripStatus with the value from the trip object or set an empty string
  const [tripStatus, setTripStatus] = useState(trip?.tripStatus || "");
  const [buttonLabel, setButtonLabel] = useState("Start Trip");
  const [loading, setLoading] = useState(false);

  const handleButtonPress = async () => {
    console.log(trip); // Debugging to confirm trip object exists
    console.log(tripStatus); // Debugging current status

    if (tripStatus === "Accepted") {
      // If the current status is 'Accepted', start the trip by updating it to 'inProgress'
      await updateTripStatus("inProgress");
    } else if (tripStatus === "inProgress") {
      // If the current status is 'inProgress', mark the trip as 'Completed'
      await updateTripStatus("Completed");
      handleCompleteTrip(); // Navigate to home after completion
    } else {
      console.log("Trip status is not valid for action:", tripStatus);
    }
  };

  const handleCancelTrip = async () => {
    setTripStatus("Cancelled");  // Optimistically update the local state
    await updateTripStatus("Cancelled");
    handleCompleteTrip();
  };

  const updateTripStatus = async (newStatus) => {
    const tripRef = doc(db, "trips", trip.id);
    try {
      await updateDoc(tripRef, {
        status: newStatus,
      });
      console.log("Trip status updated successfully to:", newStatus);
      setTripStatus(newStatus);  // Update local state
    } catch (error) {
      console.error("Error updating trip status: ", error);
      alert("Failed to update the trip status. Please try again.");
    }
  };

  const handleCompleteTrip = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate("DriverHomeScreen");
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const tripRef = doc(db, "trips", trip.id);
    
    const unsubscribe = onSnapshot(tripRef, (doc) => {
      if (doc.exists()) {
        const updatedTrip = doc.data();
        console.log("Updated trip data:", updatedTrip);
        setTripStatus(updatedTrip.status); // Update the local state with real-time trip status
        
        if (updatedTrip.status === "Accepted") {
          setButtonLabel("Start Trip");
        } else if (updatedTrip.status === "inProgress") {
          setButtonLabel("Arrived");
        }
      } else {
        console.log("Trip document does not exist");
      }
    }, (error) => {
      console.error("Error listening to trip updates:", error);
    });
    
    return () => unsubscribe();
  }, [trip.id]);

  const getStatusTextColor = () => {
    switch (tripStatus) {
      case "Accepted":
        return "#FF8C00";
      case "inProgress":
        return "#FFD700";
      case "Completed":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "#000";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={23} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.title}>Ongoing Trip Order</Text>
      </View>

      <View style={styles.tripContainer}>
        <Text style={styles.details}>From: {trip.currentLocation}</Text>
        <Text style={styles.details}>To: {trip.selectedLocation}</Text>
        <Text style={styles.details}>Price: ${trip.price}</Text>
        <Text style={styles.details}>Vehicle: {trip.vehicleType}</Text>
      </View>
      <Text style={[styles.statusText, { color: getStatusTextColor() }]}>
        Status: {trip.status}
      </Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <LoadingComponent />
        </View>
      ) : (
        <>
          {tripStatus !== "Completed" && tripStatus !== "Cancelled" && (
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          )}

          {tripStatus === "Completed" && (
            <Text style={styles.completedText}>Trip Completed</Text>
          )}

          {tripStatus !== "Completed" && tripStatus !== "Cancelled" && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancelTrip}
            >
              <Text style={styles.cancelButtonText}>Cancel Trip</Text>
            </TouchableOpacity>
          )}

          {tripStatus === "Cancelled" && (
            <Text style={styles.cancelledText}>Trip Cancelled</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "#0e1724",
  },
  title: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    color: "#fff",
    marginLeft: 20,
  },
  tripContainer: {
    marginTop: 20,
  },
  details: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0e1724",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  completedText: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    color: "green",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  cancelButton: {
    backgroundColor: "#FF6347",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  cancelledText: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default TripStatusScreen;
