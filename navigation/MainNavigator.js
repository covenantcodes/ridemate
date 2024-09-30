import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSelection from "../screens/auth/LoginSelection";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import RideBookingScreen from "../screens/home/RideBookingScreen";
import RequestDetailsScreen from "../screens/home/RequestDetailsScreen";

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
          name="Login"
          component={Login}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
