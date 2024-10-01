import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { tripId, vehicleType, currentLocation, selectedLocation, price } = route.params; // Destructure trip details
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle payment
  const handlePayment = () => {
    // Here you would typically handle the payment process (e.g., API call)

    // Show the modal for payment success
    setModalVisible(true);

    // Navigate to RideBookingScreen after 5 seconds
    setTimeout(() => {
      setModalVisible(false); // Close the modal
      navigation.navigate("RideBookingScreen"); // Navigate to RideBookingScreen
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.tripDetails}>
        <Text style={styles.detailText}>Vehicle Type: {vehicleType}</Text>
        <Text style={styles.detailText}>Current Location: {currentLocation}</Text>
        <Text style={styles.detailText}>Destination: {selectedLocation}</Text>
        <Text style={styles.detailText}>Estimated Price: ₦{price}</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>

      {/* Modal for Payment Success */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Payment Successful!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tripDetails: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#0E1724",
    borderRadius: 10,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
  payButton: {
    backgroundColor: "#0E1724",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
  },
});

export default PaymentScreen;
