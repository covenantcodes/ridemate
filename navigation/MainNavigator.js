import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSelection from "../screens/auth/LoginSelection";
import UserLogin from "../screens/auth/UserLogin";
import DriverLogin from "../screens/auth/DriverLogin";
import Register from "../screens/auth/Register";
import RideBookingScreen from "../screens/home/RideBookingScreen";
import RequestDetailsScreen from "../screens/home/RequestDetailsScreen";
import AvailableDriversScreen from "../screens/AvailableDriverScreen";
import DriverHomeScreen from "../screens/DriverHomeScreen";
import UserRegistrationScreen from "../screens/auth/UserRegistrationScreen";
import TripStatusScreen from "../screens/TripStatusScreen";
import LookingForDriversScreen from "../screens/LookingForDriversScreen";
import OrderAcceptedScreen from "../screens/OrderAcceptedScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSelection">
        <Stack.Screen
          name="LoginSelection"
          component={LoginSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverLogin"
          component={DriverLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RideBookingScreen"
          component={RideBookingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RequestDetailsScreen"
          component={RequestDetailsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AvailableDriversScreen"
          component={AvailableDriversScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DriverHomeScreen"
          component={DriverHomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UserRegistrationScreen"
          component={UserRegistrationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
        name="LookingForDriversScreen"
          component={LookingForDriversScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
        name="OrderAcceptedScreen"
          component={OrderAcceptedScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
        name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: false}}
        />

<Stack.Screen name="TripStatusScreen" component={TripStatusScreen} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
