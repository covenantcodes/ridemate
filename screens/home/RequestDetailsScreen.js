import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const availableLocations = [
  "Gate",
  "Roundabout",
  "Market",
  "School",
  "Hospital",
  // Add more locations as needed
];

const RequestDetailsScreen = ({ route, navigation }) => {
  const { vehicleType, selectedLocation } = route.params;
  const [currentLocation, setCurrentLocation] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [price, setPrice] = useState(0);

  // Function to calculate price based on current and selected locations
  const calculatePrice = () => {
    if (currentLocation === "Gate" && selectedLocation === "Roundabout") {
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
          <Text style={styles.detailText}>Destination: {selectedLocation}</Text>
        </View>

        <TextInput
          style={styles.input}
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

        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => {
            // Handle the request submission logic here
            console.log("Request submitted");
          }}
        >
          <Text style={styles.requestButtonText}>Submit Request</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    padding: 10,
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  suggestionList: {
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 100,
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
  },
  priceText: {
    fontSize: 20,
    marginVertical: 10,
  },
  requestButton: {
    backgroundColor: "#0E1724",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  requestButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default RequestDetailsScreen;
