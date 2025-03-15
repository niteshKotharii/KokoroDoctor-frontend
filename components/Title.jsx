import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

const Title = () => {
  const { width } = useWindowDimensions(); // Dynamically updates when screen resizes
  const baseFontSize = 18;
  const scaleFactor = width / 1440;
  const responsiveFontSize = baseFontSize * scaleFactor;

  return (
    <View style={styles.container}>
      <Text style={[styles.incubatedText, { fontSize: responsiveFontSize }]}>
        Harvard Innovation Lab I-Member presents
      </Text>
      <Text style={[styles.brandName, { fontSize: responsiveFontSize * 5 }]}>
        Kokoro.
        <Text style={[styles.doctorText]}>Doctor</Text>
      </Text>
      <Text style={[styles.tagline, { fontSize: responsiveFontSize }]}>
        Transforming Cardiac Care with AI
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
  incubatedText: {
    color: "#e0a8c8",
    fontWeight: "600",
    marginBottom:0,
  },
  brandName: {
    // fontSize: responsiveFontSize * 5,
    fontWeight: "bold",
    color: "#D0C4FF",
  },
  doctorText: {
    color: "#B0A0FF",
  },
  tagline: {
    alignSelf: "flex-end",
    // fontSize: responsiveFontSize,
    color: "#e0a8c8",
  },
});

export default Title;