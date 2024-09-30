import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DriverLogin = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTop}></View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={23} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.title}>Driver Login</Text>
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.loginImage}>
          <Image
            source={require("../../assets/driverL.png")}
            style={styles.carImage}
          />
        </View>

        <View style={styles.loginFormContainer}>
          <TextInput placeholder="Email" style={styles.containerTextInput} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.containerTextInput}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DriverHomeScreen")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
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

export default DriverLogin;
