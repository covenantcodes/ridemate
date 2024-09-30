import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

const LoadingComponent = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale is 1

  useEffect(() => {
    const animate = () => {
      scaleAnim.setValue(1);
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(animate);
      });
    };

    animate(); // Start the animation
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/ridemate.png")}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]} // Apply scale animation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1000, // Ensures it appears above other components
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});

export default LoadingComponent;
