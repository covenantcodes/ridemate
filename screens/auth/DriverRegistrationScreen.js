// RegistrationScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import "../../services/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const DriverRegistrationScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const auth = getAuth();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUser(user.email); // Update logged-in user state
        console.log("User registered:", user.email);
        navigation.navigate("UserLogin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error ₦{errorCode}: ₦{errorMessage}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTop}></View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={23} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.title}>User Register</Text>
      </View>

      {/* {loggedInUser && <Text>Logged in as: {loggedInUser}</Text>}  */}

      <View style={styles.loginContainer}>
        <View style={styles.loginImage}>
          <Image
            source={require("../../assets/driverL.png")}
            style={styles.carImage}
          />
        </View>

        <View style={styles.loginFormContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Email"
            value={email}
            onChangeText={onChangeEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.containerTextInput}
            placeholder="Password"
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },

  header: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 21,
    fontFamily: "PoppinsBold",
    marginLeft: 10,
    color: "#fff",
  },

  containerTop: {
    width: 600,
    marginTop: -350,
    marginLeft: -100,
    height: 600,
    borderRadius: 250,
    backgroundColor: "#0E1724",
    alignItems: "flex-end",
  },

  loginContainer: {
    padding: 10,
  },

  loginImage: {
    width: "100%",
    marginTop: -200,
    alignItems: "center",
    justifyContent: "center",
  },

  carImage: {
    width: 250,
    height: 280,
  },

  loginFormContainer: {
    paddingVertical: 20,
  },

  containerTextInput: {
    borderBottomWidth: 1,
    borderColor: "#0E1724",
    padding: 10,
    fontFamily: "PoppinsMedium",
    marginVertical: 10,
  },

  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#0E1724",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontFamily: "PoppinsSemiBold",
  },
});

export default DriverRegistrationScreen;
