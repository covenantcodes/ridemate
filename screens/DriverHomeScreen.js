import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingComponent from "../components/LoadingComponent";
import { db } from "../services/config";
import { collection, onSnapshot, doc, getDoc, deleteDoc } from "firebase/firestore";

const DriverHomeScreen = ({ navigation, route }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTripId, setCurrentTripId] = useState(null);

  const [driverStats, setDriverStats] = useState({
    tripsTaken: 0,
    amountEarned: 0,
    rating: 0,
  });

  const { userEmail } = route.params || {}; // Fallback to an empty object



 // Fetch and delete trips based on their status
const fetchAvailableTrips = () => {
  try {
    const tripsRef = collection(db, "trips");
    const unsubscribe = onSnapshot(tripsRef, (querySnapshot) => {
      const tripRequests = [];
      querySnapshot.forEach((doc) => {
        const tripData = { id: doc.id, ...doc.data() };
        
        // Filter out completed trips
        if (tripData.status !== 'completed') {
          tripRequests.push(tripData);
        } else {
          deleteTrip(doc.id); // Call delete function for completed trips
        }
      });
      setTrips(tripRequests);
      setLoading(false);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error fetching trips: ", error);
  }
};

// Function to delete a trip
const deleteTrip = async (tripId) => {
  try {
    const tripRef = doc(db, "trips", tripId);
    await deleteDoc(tripRef); // Delete the completed trip
    console.log(`Trip ${tripId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting trip: ", error);
  }
};

// Use these functions in the useEffect hook
useEffect(() => {
  const unsubscribe = fetchAvailableTrips(); // Fetch trips
  checkCurrentTrip();

  setDriverStats({
    tripsTaken: 5,
    amountEarned: 450,
    rating: 4.5,
  });

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
}, []);

  const checkCurrentTrip = async () => {
    // Assuming we have a way to get the current driver's ID
    const driverId = "current_driver_id"; // Update with the actual driver's ID
    const driverRef = doc(db, "drivers", driverId);
    const driverSnap = await getDoc(driverRef);

    if (driverSnap.exists()) {
      const driverData = driverSnap.data();
      setCurrentTripId(driverData.currentTripId || null);
    }
  };

  useEffect(() => {
    // Fetch available trips only if userEmail is valid
    if (userEmail) {
      const unsubscribe = fetchAvailableTrips();
      checkCurrentTrip();
      
      setDriverStats({
        tripsTaken: 5,
        amountEarned: 450,
        rating: 4.5,
      });
    
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [userEmail]); // Add userEmail to the dependencies array
  

  const openConfirmationModal = (trip) => {
    if (currentTripId) {
      Alert.alert(
        "Cannot Accept Trip",
        "You are currently on a trip. Please complete or cancel your current trip before accepting a new one."
      );
    } else {
      setSelectedTrip(trip);
      setModalVisible(true);
    }
  };

  const completeTrip = async (tripId) => {
    try {
      // Mark the trip as completed in Firestore
      const tripRef = doc(db, "trips", tripId);
      await deleteDoc(tripRef); // Delete the trip from Firestore

      // Update currentTripId if necessary
      if (tripId === currentTripId) {
        setCurrentTripId(null); // Reset current trip ID
      }

      Alert.alert("Success", "Trip completed successfully!");
    } catch (error) {
      console.error("Error completing trip: ", error);
      Alert.alert("Error", "Could not complete the trip.");
    }
  };

  const confirmTrip = () => {
    setModalVisible(false);
    setCurrentTripId(selectedTrip.id);

    // Pass the entire trip object along with tripStatus
    navigation.navigate("TripStatusScreen", { 
      trip: { ...selectedTrip, tripStatus: selectedTrip.tripStatus } 
    });
  };

  const handleTripPress = (trip) => {
    if (trip.id === currentTripId) {
      navigation.navigate("TripStatusScreen", { trip: trip });
    } else if (!currentTripId) {
      openConfirmationModal(trip);
    }
  };

  const renderTripItem = ({ item }) => {
    const isCurrentTrip = item.id === currentTripId;
    return (
      <TouchableOpacity onPress={() => handleTripPress(item)}>
        <View style={[styles.tripItem, isCurrentTrip && styles.currentTripItem]}>
          {isCurrentTrip && (
            <Text style={styles.currentTripLabel}>Current Trip</Text>
          )}
          <Text style={styles.tripText}>
            {item.currentLocation} to {item.selectedLocation} {"\n"}Price: ₦
            {item.price} {item.status}
          </Text>
          <Text style={styles.tripText}>Vehicle Type: {item.vehicleType}</Text>
          <TouchableOpacity
            style={[
              styles.requestButton,
              (currentTripId || isCurrentTrip) && styles.disabledRequestButton,
            ]}
            onPress={() => {
              if (isCurrentTrip) {
                completeTrip(item.id); // Complete the current trip
              } else {
                openConfirmationModal(item);
              }
            }}
            disabled={currentTripId && !isCurrentTrip}
          >
            <Text style={styles.requestButtonText}>
              {isCurrentTrip ? "Complete Trip" : currentTripId ? "Unavailable" : "Accept Request"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const sortedTrips = [...trips].sort((a, b) => {
    if (a.id === currentTripId) return -1;
    if (b.id === currentTripId) return 1;
    return 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Hi, {"\n"} Good {new Date().getHours() < 12 ? "Morning" : "Day"}
          </Text>
        </View>
        <View>
          <Image
            source={require("../assets/driver.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Trips Taken</Text>
          <Text style={styles.statValue}>{driverStats.tripsTaken}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Amount Earned</Text>
          <Text style={styles.statValue}>₦{driverStats.amountEarned}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Rating</Text>
          <Text style={styles.statValue}>{driverStats.rating} ★</Text>
        </View>
      </View>

      <View style={styles.availableTripsContainer}>
        <Text style={styles.availableTripsTitle}>
          Trip Requests
        </Text>
        {loading ? (
          <LoadingComponent />
        ) : (
          <FlatList
            data={sortedTrips}
            keyExtractor={(item) => item.id}
            renderItem={renderTripItem}
            contentContainerStyle={styles.tripList}
          />
        )}
      </View>

      {selectedTrip && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Trip</Text>
              <Text style={styles.modalText}>
                Trip from {selectedTrip.currentLocation} to{" "}
                {selectedTrip.selectedLocation} for ₦{selectedTrip.price}{" "}
                with a {selectedTrip.vehicleType}.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={confirmTrip}
                >
                  <Text style={styles.acceptButtonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  currentTripItem: {
    borderColor: "#0e1724",
    borderWidth: 2,
  },
  currentTripLabel: {
    color: "#0e1724",
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 5,
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
  disabledRequestButton: {
    backgroundColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#0e1724",
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});

export default DriverHomeScreen;
