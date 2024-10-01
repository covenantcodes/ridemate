import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "../../services/config"; // Ensure Firebase is initialized here
import LoadingComponent from "../../components/LoadingComponent";

const UserLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to check user role
  const checkUserRole = async (userId) => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId); // 'users' collection
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User Data: ", userData); // Debug log
      if (userData && userData.role) {
        return userData.role; // Assuming the role is stored in a 'role' field
      } else {
        throw new Error("User role not found in document");
      }
    } else {
      throw new Error("User document does not exist");
    }
  };

  const handleLogin = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user.email);

        // Retrieve the user role after login
        try {
          const role = await checkUserRole(user.uid);
          console.log("User Role:", role); // Debug log

          // Normalize role to lowercase for comparison
          if (role.toLowerCase() === "driver") {
            // Show an alert if the user is a driver but logged in via the user login screen
            Alert.alert(
              "Login Failed",
              "You are registered as a driver. Please log in via the Driver Login."
            );
          } else if (role.toLowerCase() === "user") {
            // Navigate to RideBookingScreen if role is user
            navigation.navigate("RideBookingScreen");
          } else {
            Alert.alert("Error", "Invalid user role");
          }
        } catch (error) {
          console.error("Role check error: ", error); // Debug log
          Alert.alert("Error", error.message);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Login error: ", errorMessage); // Debug log
        Alert.alert("Login Failed", errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingComponent />}
      <View style={styles.containerTop}></View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={23} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.title}>User Login</Text>
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
            placeholder="Email"
            style={styles.containerTextInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.containerTextInput}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate("UserRegistrationScreen")}
        >
          <Text style={styles.linkText}>
            Don't have an account?{" "}
            <Text style={styles.linkHighlight}>Register</Text>
          </Text>
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
    width: 180,
    height: 380,
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

  linkContainer: {
    marginTop: 10,
    alignItems: "center",
  },

  linkText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#333",
  },

  linkHighlight: {
    color: "#0E1724",
    fontFamily: "PoppinsSemiBold",
  },
});

export default UserLogin;
