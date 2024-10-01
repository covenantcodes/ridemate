import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";

const OrderAcceptedScreen = ({ route }) => {
  const { tripId } = route.params;

  return (
    <View style={styles.container}>
        <Image source={require("../assets/ridemate.png")}/>
      <Text style={styles.title}>Order Accepted</Text>
      <Text style={styles.message}>A driver is on their way!</Text>
      {/* Optionally, you can provide more information or actions here */}
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
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
  },
  message: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
  },
});

export default OrderAcceptedScreen;
