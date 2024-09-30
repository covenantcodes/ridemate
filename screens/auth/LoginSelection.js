import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginSelection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/ridemate.png")} />
      <Text style={styles.title}>RideMate</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E1724",
    padding: 20,
  },
  title: {
    marginTop: 5,
    fontSize: 28,

    marginBottom: 20,
    color: "#fff",
    fontFamily: "PoppinsBold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#7a7a7a",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#0E1724",
    fontFamily: "PoppinsSemiBold",
  },
  icon: {
    marginTop: 50,
  },
});

export default LoginSelection;
