import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RideBookingScreen = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("Tricycle");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const [locationSearchText, setLocationSearchText] = useState("");

  const navigation = useNavigation();

  // List of all locations
  const locations = [
    "University of Ibadan",
    "Bodija Market",
    "Mokola Roundabout",
    "Agbowo Shopping Complex",
    "Dugbe Market",
  ];

  // Filter locations based on search text
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(locationSearchText.toLowerCase())
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setModalVisible(false);
  };

  const region = {
    latitude: 7.3775,
    longitude: 3.947,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Search and Profile Icon */}
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for your destination"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={() => console.log("Profile Icon Pressed")}>
          <Ionicons name="person" size={24} color="#0E1724" />
        </TouchableOpacity>
      </View>

      {/* Select Location Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.locationButtonText}>{selectedLocation}</Text>
      </TouchableOpacity>

      {/* Map Section */}
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{ latitude: 7.3775, longitude: 3.947 }}
          title="Home"
        />
        <Marker coordinate={{ latitude: 7.3795, longitude: 3.9494 }}>
          <Image
            source={require("../../assets/carTracker.png")}
            style={styles.carIcon}
          />
        </Marker>
        <Polyline
          coordinates={[
            { latitude: 7.3775, longitude: 3.947 },
            { latitude: 7.3795, longitude: 3.9494 },
          ]}
          strokeColor="#00FF00"
          strokeWidth={3}
        />
      </MapView>

      {/* Vehicle Categories */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedVehicle === "Tricycle" && styles.selected,
          ]}
          onPress={() => setSelectedVehicle("Tricycle")}
        >
          <Image
            source={require("../../assets/tricycle.png")}
            style={styles.icon}
          />
          <Text style={styles.categoryText}>Tricycle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedVehicle === "Car" && styles.selected,
          ]}
          onPress={() => setSelectedVehicle("Car")}
        >
          <Image
            source={require("../../assets/caricon.png")}
            style={styles.icon}
          />
          <Text style={styles.categoryText}>Cab</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedVehicle === "Bus" && styles.selected,
          ]}
          onPress={() => setSelectedVehicle("Bus")}
        >
          <Image source={require("../../assets/bus.png")} style={styles.icon} />
          <Text style={styles.categoryText}>Bus</Text>
        </TouchableOpacity>
      </View>

      {/* Modal with Search */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Location</Text>

            {/* Search Input inside Modal */}
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Search location..."
              value={locationSearchText}
              onChangeText={setLocationSearchText}
            />

            {/* Filtered Location List */}
            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationItem}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text style={styles.locationText}>{item}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <Text style={styles.noLocationText}>No locations found</Text>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Send Request Button */}
      <TouchableOpacity
        style={styles.requestButton}
        onPress={() =>
          navigation.navigate("RequestDetailsScreen", {
            vehicleType: selectedVehicle,
            selectedLocation: selectedLocation,
          })
        }
      >
        <Text style={styles.requestButtonText}>Send Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  locationButton: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  locationButtonText: {
    fontSize: 16,
    color: "gray",
  },
  map: {
    flex: 1,
  },
  carIcon: {
    width: 30,
    height: 30,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  categoryButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderColor: "transparent",
    borderWidth: 1,
    width: "30%",
  },
  selected: {
    borderColor: "#0E1724",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalSearchInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  locationItem: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
  },
  noLocationText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  requestButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  requestButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RideBookingScreen;
