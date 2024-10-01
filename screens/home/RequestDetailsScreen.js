import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingComponent from "../../components/LoadingComponent";
import { db } from "../../services/config"; // Adjust the path as necessary
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const availableLocations = [
  "Gate",
  "Roundabout",
  "Market",
  "School",
  "Hospital",
];

const RequestDetailsScreen = ({ route, navigation }) => {
  const { vehicleType, selectedLocation } = route.params;
  const [currentLocation, setCurrentLocation] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  // Function to calculate price based on current and selected locations
  const calculatePrice = () => {
    if (
      currentLocation === "Gate" &&
      selectedLocation === "Mokola Roundabout"
    ) {
      setPrice(100); // Fixed price for Gate to Roundabout
    } else if (currentLocation === "Market" && selectedLocation === "School") {
      setPrice(150); // Example fixed price for Market to School
    } else {
      setPrice(0); // Default price if no match
    }
  };

  // Function to filter locations based on user input
  const filterLocations = (text) => {
    const filtered = availableLocations.filter((location) =>
      location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
    setCurrentLocation(text);
    calculatePrice();
  };

  const selectLocation = (location) => {
    setCurrentLocation(location);
    setFilteredLocations([]); // Clear suggestions
    calculatePrice(); // Recalculate price based on selected location
  };

  // Function to handle trip submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const tripData = {
        vehicleType: vehicleType,
        currentLocation: currentLocation,
        selectedLocation: selectedLocation,
        price: price,
        timestamp: new Date(), // Optional timestamp
      };

      // Add a new trip document to the "trips" collection
      await addDoc(collection(db, "trips"), tripData);
      console.log("Trip saved successfully!");
      // Optionally navigate back or show a success message
      navigation.goBack();
    } catch (error) {
      console.error("Error saving trip:", error);
    } finally {
      setLoading(false);
    }
  };

  // Define vehicle images based on vehicle type
  const getVehicleImage = () => {
    switch (vehicleType) {
      case "Tricycle":
        return require("../../assets/tricycle.png");
      case "Car":
        return require("../../assets/caricon.png");
      case "Bus":
        return require("../../assets/bus.png");
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={23} />
          </TouchableOpacity>
          <Text style={styles.title}>Your Trip Details</Text>
        </View>

        <View style={styles.requestDetailsContainer}>
          {/* Display Vehicle Image */}
          <View style={styles.vehicleContainer}>
            <Image source={getVehicleImage()} style={styles.vehicleImage} />
          </View>

          {/* Display Destination with Marker Icon */}
          <View style={styles.destinationContainer}>
            <Ionicons name="location-outline" size={20} />
            <Text style={styles.detailText}>
              Destination: {selectedLocation}
            </Text>
          </View>

          <TextInput
            style={styles.containerTextInput}
            placeholder="Enter current location"
            value={currentLocation}
            onChangeText={filterLocations}
          />

          {/* Display filtered suggestions */}
          {filteredLocations.length > 0 && (
            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestion}
                  onPress={() => selectLocation(item)}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}

          <Text style={styles.priceText}>Estimated Price: ${price}</Text>

          <TouchableOpacity style={styles.requestButton} onPress={handleSubmit}>
            <Text style={styles.requestButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <LoadingComponent />}
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
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 40,
  },
  title: {
    fontSize: 21,
    fontFamily: "PoppinsBold",
    marginLeft: 10,
  },
  requestDetailsContainer: {
    padding: 20,
  },
  vehicleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  vehicleImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
  },
  destinationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    marginLeft: 4,
  },
  containerTextInput: {
    borderBottomWidth: 1,
    borderColor: "#0E1724",
    padding: 10,
    fontFamily: "PoppinsMedium",
    marginVertical: 10,
  },

  suggestionList: {
    borderWidth: 1,
    borderColor: "#0E1724",
    borderRadius: 15,
    maxHeight: 150,
    marginBottom: 15,
  },
  suggestion: {
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  suggestionText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  priceText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    marginVertical: 10,
  },
  requestButton: {
    width: "100%",
    backgroundColor: "#0e1724",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  requestButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
});

export default RequestDetailsScreen;
