import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const baseFontSize = 18;
const scaleFactor = width / 1440;
const responsiveFontSize = baseFontSize * scaleFactor;

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.incubatedText}>Incubated with Harvard Innovation Labs</Text>
      <Text style={styles.brandName}>
        Kokoro.
        <Text style={styles.doctorText}>Doctor</Text>
      </Text>
      <Text style={styles.tagline}>
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
    fontSize: responsiveFontSize,
    fontWeight: "600",
    marginBottom:0,
  },
  brandName: {
    fontSize: responsiveFontSize * 5,
    fontWeight: "bold",
    color: "#D0C4FF",
  },
  doctorText: {
    color: "#B0A0FF",
  },
  tagline: {
    alignSelf: "flex-end",
    fontSize: responsiveFontSize,
    color: "#e0a8c8",
  },
});

export default Title;