import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const PromoModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();

  return (
    <>
      <Modal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="down"
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        backdropOpacity={0.6}
        backdropTransitionOutTiming={1}
        useNativeDriver
        //   backdropTransitionOutTiming={0}
        //   customBackdrop={
        //     <TouchableWithoutFeedback onPress={onClose}>
        //       <BlurView
        //         intensity={90}
        //         tint="dark"
        //         style={StyleSheet.absoluteFill}
        //       />
        //     </TouchableWithoutFeedback>
        //   }
        style={styles.modal}
      >
        {/* <View style={styles.blurWrapper}>
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
      </View>

      <Animatable.View
        animation="fadeInUp"
        duration={600}
        easing="ease-out"
        style={styles.content}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Your secure digital medical vault</Text>
          <Text style={styles.desc}>
            Tired of searching for medical documents when you need them the
            most? MediLocker is here to make your life easier!
          </Text>

          <View style={styles.bullets}>
            <Text style={styles.bullet}>
              ✨ Store All Medical Records in One Place
            </Text>
            <Text style={styles.bullet}>✨ Access Anytime, Anywhere</Text>
            <Text style={styles.bullet}>✨ 100% Secure & Private</Text>
            <Text style={styles.bullet}>✨ Share with a Tap</Text>
          </View>

          <TouchableOpacity
            style={styles.tryBtn}
            onPress={() => {
              onClose();
              navigation.navigate("Medilocker");
            }}
          >
            <Text style={styles.tryText}>Try MediLocker</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View> */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.fullscreenWrapper}>
            <BlurView
              intensity={10}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />

            <TouchableWithoutFeedback>
              <Animatable.View
                animation="fadeInUp"
                duration={100}
                easing="ease-out"
                style={styles.content}
              >
                <ScrollView keyboardShouldPersistTaps="handled">
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                  >
                    <Text style={styles.closeText}>×</Text>
                  </TouchableOpacity>
                  <Image
                    source={require("../../assets/DoctorsPortal/Images/MedicalVault.png")} // Change to your icon
                    style={styles.icon}
                  />

                  <Text style={styles.title}>
                    Your secure digital medical vault
                  </Text>
                  <Text style={styles.desc}>
                    Tired of searching for medical documents when you need them
                    the most? MediLocker is here to make your life easier!
                  </Text>

                  <View style={styles.bullets}>
                    <Text style={styles.bullet}>
                      ✨ Store All Medical Records in One Place
                    </Text>
                    <Text style={styles.bullet}>
                      ✨ Access Anytime, Anywhere
                    </Text>
                    <Text style={styles.bullet}>✨ 100% Secure & Private</Text>
                    <Text style={styles.bullet}>✨ Share with a Tap</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.tryBtn}
                    onPress={() => {
                      onClose();
                      navigation.navigate("Medilocker");
                    }}
                  >
                    <Text style={styles.tryText}>Try MediLocker</Text>
                  </TouchableOpacity>
                </ScrollView>
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: "0%",
  },
  //   blurWrapper: {
  //     ...StyleSheet.absoluteFillObject,
  //     zIndex: -1,
  //   },
  fullscreenWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: "5%",
    paddingBottom: "5%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeText: {
    fontSize: 26,
    color: "#999",
  },
  icon: {
    alignSelf: "center",
    width: 55,
    height: 55,
    marginBottom: "5%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2%",
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  bullets: {
    marginTop: "5%",
  },
  bullet: {
    fontSize: 14,
    marginVertical: "1%",
  },
  tryBtn: {
    backgroundColor: "rgb(237, 111, 128)",
    borderRadius: 10,
    paddingVertical: "4%",
    marginTop: "5%",
  },
  tryText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PromoModal;
{
  /* <Image
          source={require("../assets/lock-icon.png")} // Change to your icon
          style={styles.icon}
        /> */
}
