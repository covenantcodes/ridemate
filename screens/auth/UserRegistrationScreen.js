import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import "../../services/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

const UserRegistrationScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [role, setRole] = useState("User"); // Default role is "User"
  const [loggedInUser, setLoggedInUser] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUser(user.email); // Update logged-in user state

        // Save the user's role and other data in Firestore
        return setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: role, // Store the selected role (User or Driver)
        });
      })
      .then(() => {
        console.log("User registered with role:", role);
        navigation.navigate("UserLogin"); // Navigate to the login screen
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error ${errorCode}: ${errorMessage}`);
        Alert.alert("Registration Error", errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTop}></View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={23} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.title}>Register</Text>
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.loginImage}>
          <Image
            source={require("../../assets/car.png")}
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

          {/* Role selection: User or Driver */}
          <View style={styles.roleSelectionContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "User" && styles.roleButtonSelected,
              ]}
              onPress={() => setRole("User")}
            >
              <Text style={styles.roleButtonText}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "Driver" && styles.roleButtonSelected,
              ]}
              onPress={() => setRole("Driver")}
            >
              <Text style={styles.roleButtonText}>Driver</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("UserLogin")}>
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
    width: 130,
    height: 330,
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
  roleSelectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  roleButton: {
    padding: 10,
    backgroundColor: "#8f96a1",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  roleButtonSelected: {
    backgroundColor: "#0E1724",
  },
  roleButtonText: {
    fontSize: 16,
    color: "#fff",
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
  link: {
    color: "#0E1724",
    textAlign: "center",
    marginTop: 10,
  },
});

export default UserRegistrationScreen;
