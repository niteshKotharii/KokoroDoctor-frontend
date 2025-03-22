import React, { useState } from "react";
import { ImageBackground, Text, View, StyleSheet, Pressable } from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import Header from "../components/Header";
import Title from "../components/Title";

const Help = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <SideBarNavigation navigation={navigation} />
      <SideBarNavigation navigation={navigation} />

      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: "https://familypracticecenterpc.com/wp-content/uploads/2019/09/ask-the-doctors-about-heart-health.jpg",
          }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View
            style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.6)" }]}
          />
          <View style={styles.parent}>
            <View style={styles.Left}>
              <SideBarNavigation navigation={navigation} />
              <SideBarNavigation navigation={navigation} />
            </View>
            <View style={styles.Right}>
              <View style={styles.header}>
                <Header navigation={navigation} />
              </View>
              <View style={styles.title}>
                <Title />
              </View>
              <View style={styles.Helpbox}>
                <View style={styles.headerContainer}>
                  <Text style={styles.head}>Help</Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.sectionTitle}>FAQs</Text>
                  <Text style={styles.question}>
                    How can I improve my heart health?
                  </Text>
                  <Text style={styles.answer}>
                    Eat well, exercise, manage stress, and avoid smoking.
                  </Text>

                  <Text style={styles.question}>
                    What are heart disease symptoms?
                  </Text>
                  <Text style={styles.answer}>
                    Chest pain, shortness of breath, fatigue, and dizziness. See
                    a doctor if you experience these.
                  </Text>

                  <Text style={styles.question}>
                    When should I check my heart health?
                  </Text>
                  <Text style={styles.answer}>
                    Regular check-ups are important, especially if you have risk
                    factors.
                  </Text>

                  <Text style={styles.question}>
                    What’s a healthy blood pressure?
                  </Text>
                  <Text style={styles.answer}>
                    Below 120/80 mm Hg is ideal.
                  </Text>

                  <Text style={styles.sectionTitle}>Resources</Text>
                  <Text style={styles.resource}>Heart Health Tips</Text>
                  <Text style={styles.resource}>
                    Exercise & Nutrition Guides
                  </Text>
                  <Text style={styles.resource}>Find a Doctor</Text>
                  <Pressable onPress={() => {navigation.navigate("ContactUs")}}>
                    <Text style={styles.contact}>
                      For more help, <Text style={styles.link}>contact us</Text>.
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderWidth: 3,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  imageContainer: {
    //borderWidth: 2,
    borderColor: "#00ffff",
    height: "100%",
    width: "100%",
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    //borderWidth: 1,
  },
  Right: {
    height: "100%",
    width: "100%",
    //borderWidth: 1,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    //transform:[{scale:0.8}],
    opacity: 80,
    //marginVertical:"-5%"
    alignSelf: "center",
    flexDirection: "column",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    width: "12%",
    width: "12%",
    marginLeft: "70%",
    marginTop: 15,
  },
  title: {
    marginRight: "18%",
    alignSelf: "center",
  },
  Helpbox: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    width: "60%",
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
  Helpbox: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    width: "60%",
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginRight: "18%",
    alignItems: "flex-start",
  },

  contain: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  contentContainer: {
    flex: 3,
  },
  head: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a34cc",
    marginTop: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  resource: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  contact: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  link: {
    color: "#5a34cc",
    fontWeight: "bold",
    alignItems: "flex-start",
  },

  contain: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  contentContainer: {
    flex: 3,
  },
  head: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a34cc",
    marginTop: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  resource: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  contact: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  link: {
    color: "#5a34cc",
    fontWeight: "bold",
  },
});

export default Help;