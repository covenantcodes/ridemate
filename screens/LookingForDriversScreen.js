

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../services/config";
import { doc, onSnapshot } from "firebase/firestore";
import LoadingComponentLoading from "../components/LoadingComponentLoading";

const LookingForDriversScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [tripStatus, setTripStatus] = useState("");

  useEffect(() => {
    const tripRef = doc(db, "trips", tripId);
    const unsubscribe = onSnapshot(tripRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setTripStatus(data.status);
        
    
        // Navigate based on status
        if (data.status === "inProgress") {
          navigation.navigate("OrderAcceptedScreen", { tripId });
        } else if (data.status === "Completed") {
          navigation.navigate("PaymentScreen", { tripId });
        }
      }
    });

    return () => unsubscribe();
  }, [tripId]);

  return (
    <View style={styles.container}>
      
      <LoadingComponentLoading/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LookingForDriversScreen;
