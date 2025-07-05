import React, { useState, useRef, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Platform,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import { useNavigation } from "@react-navigation/native";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";
import { registerDoctor } from "../../../utils/AuthService";
import Header from "../../../components/PatientScreenComponents/Header";

const DoctorsSignUp = () => {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const [rememberMe, setRememberMe] = useState(false);
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		location: "",
		phoneNumber: "",
		password: "",
		otp: ["", "", "", ""],
	});

	const handleChange = (key, value) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};
	const toggleRememberMe = () => {
		setRememberMe(!rememberMe);
	};

	const handleSignup = async () => {
		try {
			await registerDoctor({
				doctorname: `${formData.firstname} ${formData.lastname}`,
				email: formData.email,
				password: formData.password,
				phoneNumber: formData.phoneNumber,
				location: formData.location,
			});
			alert("Doctor registered successfully!");
			navigation.navigate("DoctorMedicalRegistration");
		} catch (error) {
			alert(error.message);
			console.error("Doctor registration error:", error);
		}
	};

	return (
		<>
			{Platform.OS === "web" && width > 1000 && (
				<View style={styles.webContainer}>
					<NewSideNav navigation={navigation} />
					<View style={styles.Content}>
						<View style={styles.DetailContainer}>
							<Text style={styles.heading}>Sign Up</Text>
							<View style={styles.details}>
								<Text style={styles.inputHeading}>First Name</Text>
								<TextInput
									placeholder="Enter your first name..."
									placeholderTextColor="#c0c0c0"
									style={[
										styles.inputContainer,
										{ color: formData.firstname ? "black" : "#c0c0c0" },
									]}
									value={formData.name}
									onChangeText={(val) => handleChange("firstname", val)}
								/>
								<Text style={styles.inputHeading}>Last Name</Text>
								<TextInput
									placeholder="Enter your last name..."
									placeholderTextColor="#c0c0c0"
									style={[
										styles.inputContainer,
										{ color: formData.lastname ? "black" : "#c0c0c0" },
									]}
									value={formData.name}
									onChangeText={(val) => handleChange("lastname", val)}
								/>
								<Text style={styles.inputHeading}>Email Id</Text>
								<TextInput
									placeholder="Enter your email..."
									placeholderTextColor="#c0c0c0"
									style={[
										styles.inputContainer,
										{ color: formData.email ? "black" : "#c0c0c0" },
									]}
									value={formData.email}
									onChangeText={(val) => handleChange("email", val)}
								/>
								<Text style={styles.inputHeading}>Establishment Location</Text>
								<TextInput
									placeholder="Enter your location..."
									placeholderTextColor="#c0c0c0"
									style={[
										styles.inputContainer,
										{ color: formData.location ? "black" : "#c0c0c0" },
									]}
									value={formData.location}
									onChangeText={(val) => handleChange("location", val)}
								/>
								<Text style={styles.inputHeading}>Phone No</Text>
								<TextInput
									placeholder="Enter your phone number..."
									placeholderTextColor="#c0c0c0"
									keyboardType="phone-pad"
									style={[
										styles.inputContainer,
										{ color: formData.phoneNumber ? "black" : "#c0c0c0" },
									]}
									value={formData.phone}
									onChangeText={(val) => handleChange("phoneNumber", val)}
								/>
								<Text style={styles.inputHeading}>Password</Text>
								<TextInput
									placeholder="Enter your password..."
									placeholderTextColor="#c0c0c0"
									secureTextEntry
									style={[
										styles.inputContainer,
										{ color: formData.password ? "black" : "#c0c0c0" },
									]}
									value={formData.password}
									onChangeText={(val) => handleChange("password", val)}
								/>
								<View style={styles.rememberForgotRow}>
									<View style={styles.rememberMeContainer}>
										<TouchableOpacity
											style={styles.checkboxContainer}
											onPress={toggleRememberMe}>
											<View
												style={[
													styles.checkbox,
													rememberMe && styles.checkedBox,
												]}>
												{rememberMe && (
													<Ionicons
														name="checkmark"
														size={12}
														color="#fff"
													/>
												)}
											</View>
										</TouchableOpacity>
										<Text style={styles.rememberMeText}>Remember me</Text>
									</View>
								</View>

								<TouchableOpacity
									style={styles.continueContainer}
									onPress={handleSignup}>
									<Text style={styles.continueText}>Sign in</Text>
									<Image
										style={styles.arrowIcon}
										source={require("../../../assets/DoctorsPortal/Icons/ArrowIcon.png")}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.skipContainer}
									onPress={() =>
										navigation.navigate("DoctorMedicalRegistration")
									}>
									<Text style={styles.continueText}>Skip</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<SideImageStyle />
				</View>
			)}
			{(Platform.OS !== "web" || width < 1000) && (
				<ScrollView style={styles.appContainer}>
					<Header style={styles.appHeader} />
					<View style={styles.Content}>
						<View style={styles.DetailContainer}>
							<Text style={styles.heading}>Sign Up</Text>
							<View style={styles.details}>
								<Text style={styles.inputHeading}>First Name</Text>
								<View style={styles.inputWrapper}>
									<TextInput
										placeholder="Enter your first name..."
										placeholderTextColor="#c0c0c0"
										style={[
											styles.inputContainer,
											{ color: formData.firstname ? "black" : "#c0c0c0" },
										]}
										value={formData.firstname}
										onChangeText={(val) => handleChange("firstname", val)}
									/>
								</View>

								<Text style={styles.inputHeading}>Last Name</Text>
								<View style={styles.inputWrapper}>
									<TextInput
										placeholder="Enter your last name..."
										placeholderTextColor="#c0c0c0"
										style={[
											styles.inputContainer,
											{ color: formData.lastname ? "black" : "#c0c0c0" },
										]}
										value={formData.lastname}
										onChangeText={(val) => handleChange("lastname", val)}
									/>
								</View>

								<Text style={styles.inputHeading}>Email Id</Text>
								<View style={styles.inputWrapper}>
									<TextInput
										placeholder="Enter your email..."
										placeholderTextColor="#c0c0c0"
										style={[
											styles.inputContainer,
											{ color: formData.email ? "black" : "#c0c0c0" },
										]}
										value={formData.email}
										onChangeText={(val) => handleChange("email", val)}
									/>
								</View>

								<Text style={styles.inputHeading}>Phone No</Text>
								<View style={styles.inputWrapper}>
									<TextInput
										placeholder="Enter your phone number..."
										placeholderTextColor="#c0c0c0"
										keyboardType="phone-pad"
										style={[
											styles.inputContainer,
											{ color: formData.phoneNumber ? "black" : "#c0c0c0" },
										]}
										value={formData.phoneNumber}
										onChangeText={(val) => handleChange("phoneNumber", val)}
									/>
								</View>

								<Text style={styles.inputHeading}>Password</Text>
								<View style={styles.inputWrapper}>
									<TextInput
										placeholder="Enter your password..."
										placeholderTextColor="#c0c0c0"
										secureTextEntry
										style={[
											styles.inputContainer,
											{ color: formData.password ? "black" : "#c0c0c0" },
										]}
										value={formData.password}
										onChangeText={(val) => handleChange("password", val)}
									/>
								</View>

								<View style={styles.rememberForgotRow}>
									<TouchableOpacity
										style={styles.checkboxContainer}
										onPress={toggleRememberMe}>
										<View
											style={[
												styles.checkbox,
												rememberMe && styles.checkedBox,
											]}>
											{rememberMe && (
												<Ionicons
													name="checkmark"
													size={12}
													color="#fff"
												/>
											)}
										</View>
									</TouchableOpacity>
									<Text style={styles.rememberMeText}>Remember me</Text>
								</View>

								<View style={styles.btns}>
									<TouchableOpacity
										style={styles.continueContainer}
										onPress={handleSignup}>
										<Text style={styles.continueText}>Sign in</Text>
										<Text>{"\n"}</Text>
									</TouchableOpacity>
									<Text style={styles.orOption}>Or</Text>

									<TouchableOpacity
										style={styles.continueWithGoogle}
										onPress={handleSignup}>
										<Image
											style={styles.googleIcon}
											source={require("../../../assets/Images/google-icon.png")}
										/>
										<Text style={styles.continueText}>Sign in with Google</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	webContainer: {
		width: "100%",
		flexDirection: "row",
		backgroundColor: "#FCF5F7",
		flex: 1,
	},

	appContainer: {
		flex: 1,
		width: "100%",
		backgroundColor: "#FCF5F7",
	},

	Content: {
		width: "100%",
		paddingVertical: 20,
		backgroundColor: "#FCF5F7",
		...Platform.select({
			web: {
				width: "60%",

				height: "100%",
			},
		}),
	},

	DetailContainer: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#FCF5F7",
		borderRadius: 10,
		marginHorizontal: 10,
		padding: 10,
		minHeight: 400,
		Width: "100%",
		...Platform.select({
			web: {
				alignItems: "left",
			},
		}),
	},

	inputWrapper: {
		width: "100%",
		maxWidth: 400,
		marginBottom: 10,
	},

	heading: {
		fontSize: 28,
		fontWeight: "600",
		marginBottom: 10,
		textAlign: "left",
		color: "#000",
		...Platform.select({
			web: {
				fontSize: 30,
				fontWeight: "500",
				marginBottom: 0,
			},
		}),
	},

	details: {
		width: "100%",
		margin: "auto",
		paddingHorizontal: 10,
		...Platform.select({
			web: {
				width: "100%",
				marginLeft: "auto",
				marginRight: "auto",
				fontSize: 14,
			},
		}),
	},

	inputHeading: {
		fontSize: 16,
		marginTop: 10,
		color: "#333",
		...Platform.select({
			web: {
				fontSize: 16,
				marginTop: 0,
			},
		}),
	},

	inputContainer: {
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		fontSize: 16,
		paddingHorizontal: 5,
		width: "100%",
		backgroundColor: "#fff",
		marginBottom: 10,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 1,
	},

	note: {
		fontSize: 13,
		fontWeight: "500",
		marginTop: "3%",
		color: "#444",
	},

	rememberForgotRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		marginTop: 10,
		...Platform.select({
			web: {
				marginBottom: 10,
			},
		}),
	},

	rememberMeContainer: {
		flexDirection: "row",
		alignItems: "center",
	},

	checkboxContainer: {
		marginRight: 10,
	},

	checkbox: {
		width: 16,
		height: 16,
		borderWidth: 1,
		borderColor: "#999",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
	},

	checkedBox: {
		backgroundColor: "#10B981",
		borderColor: "#10B981",
	},

	rememberMeText: {
		fontSize: 16,
		color: "#666",
	},

	btns: {
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		marginTop: 10,
	},
	orOption: {
		fontSize: 14,
		textAlign: "center",
		fontWeight: "600",
		marginVertical: 10,
		fontFamily: Platform.OS === "web" ? "Poppins_500Medium" : undefined,
	},

	googleIcon: {
		width: 20,
		height: 20,
		resizeMode: "contain",
		marginRight: 10,
	},
	continueContainer: {
		width: "100%",
		maxWidth: 400,
		height: 42,
		backgroundColor: "#1FBF86",
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	continueWithGoogle: {
		width: "100%",
		maxWidth: 400,
		backgroundColor: "#fff",
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		height: 45,
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
		gap: 6,
	},
	btns: {
		width: "100%",
		marginTop: 10,
	},

	skipContainer: {
		marginTop: 16,
		width: "100%",
		height: 38,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		backgroundColor: "#1FBF86",
		...Platform.select({
			web: {
				marginLeft: "15%",
				width: "30%",
			},
		}),
	},

	continueText: {
		fontSize: 15,
		fontWeight: "bold",
		color: "black",
	},

	arrowIcon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
		position: "absolute",
		right: 10,
		borderRadius: 12,
	},
});
export default DoctorsSignUp;
