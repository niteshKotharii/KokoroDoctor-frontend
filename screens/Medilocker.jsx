import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import * as DocumentPicker from "expo-document-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { ProgressBar } from "react-native-paper";
import { Svg, Circle } from "react-native-svg";
import LoginSignUp from "../components/LoginSignUp";

const Medilocker = ({ navigation }) => {
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const profileOptions = ["View Profile", "Edit Profile", "Logout"];
  const [dropdownVisible, setDropdownVisible] = useState();

  const [files, setFiles] = useState([]);
  // Load files from AsyncStorage when the component mounts
  useEffect(() => {
    const loadFiles = async () => {
      const storedFiles = await AsyncStorage.getItem("files");
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      }
    };
    loadFiles();
  }, []);

  // Save files to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  //Function to handle file selection

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
  
      if (result.canceled === true) {
        return; // Exit if canceled
      }
  
      if (!result.assets || result.assets.length === 0) {
        alert("Error", "No file data received.");
        return;
      }
  
      const fileName = result.assets[0].name || "Unknown File";
      const fileSizeBytes = result.assets[0].size ?? null;
  
      let fileSize = "Unknown Size";
      if (fileSizeBytes !== null) {
        fileSize =
          fileSizeBytes < 1024
            ? `${fileSizeBytes} B`
            : fileSizeBytes < 1048576
            ? `${(fileSizeBytes / 1024).toFixed(2)} KB`
            : `${(fileSizeBytes / 1048576).toFixed(2)} MB`;
      }
  
      const newFile = { name: fileName, size: fileSize, progress: 0 };
  
      setFiles((prevFiles) => [...prevFiles, newFile]);
  
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.name === newFile.name ? { ...file, progress } : file
          )
        );
        if (progress >= 100) clearInterval(interval);
      }, 500);
    } catch (err) {
      alert("Error", "Something went wrong while picking the file.");
      //console.log(err);
    }
  };

  //Function to remove a file from the list
  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  // const removeFile = async (fileName) => {
  //   const updatedFiles = files.filter((file) => file.name !== fileName);
  //   setFiles(updatedFiles);
  //   await AsyncStorage.setItem("files", JSON.stringify(updatedFiles));
  // };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../assets/Images/MedicineBackground.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
        <View style={styles.parent}>

            <View style={styles.Left}>
                <SideBarNavigation navigation={navigation} />
            </View>

            <View style={styles.Right}>
                <View style={styles.header}><LoginSignUp navigation={navigation}/></View>
                <View style={styles.medilocker_Container}>
                    <View style={styles.DashedBox}>
                    <ImageBackground
                        source={require("../assets/Images/Rectangle.png")}
                        style={styles.dashedBorder}
                        resizeMode="stretch"
                    >
                        <Text style={styles.uploadTitle}>Medilocker</Text>
                        <Image
                        source={require("../assets/Icons/Vector.png")}
                        style={styles.uploadIcon}
                        />
                        <Text style={styles.uploadText}>
                        Drag and Drop your documents here, or
                        </Text>
                        <TouchableOpacity onPress={pickDocument}>
                            <Text style={styles.uploadLink}>Click to Browse</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    </View>
                    <Text style={styles.files_Upload}>Upload your files</Text>
                    {/* File Upload List */}
                    <View style={styles.fileList}>
                    <FlatList
                        data={files}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                        <View style={styles.fileItem}>
                            <TouchableOpacity disabled>
                            <MaterialIcons
                                name={
                                item.progress === 100
                                    ? "check-circle"
                                    : "radio-button-unchecked"
                                }
                                size={24}
                                color={item.progress === 100 ? "#2CBE5E" : "green"}
                                style={styles.checkbox}
                            />
                            </TouchableOpacity>
                            <Image
                            source={require("../assets/Icons/file.png")}
                            style={styles.fileIcon}
                            />
                            <View style={styles.fileDetailsContainer}>
                            <View style={styles.fileDetails}>
                                <Text style={styles.fileName}>{item.name}</Text>
                                <Text style={styles.fileSize}>
                                {item.size} Uploaded
                                </Text>
                            </View>

                            {/* <ProgressBar
                                progress={item.progress / 100}
                                color="#00CC66"
                            />

                            {item.progress === 100 && (
                                <TouchableOpacity
                                onPress={() => removeFile(item.name)}
                                style={styles.deleteButton}
                                >
                                <MaterialIcons name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            )} */}
                            {item.progress < 100 ? (
                                <View style={styles.circularProgressContainer}>
                                <View style={styles.circularProgress}>
                                    <Svg width={80} height={80} viewBox="0 0 100 100">
                                    <Circle
                                        cx="60"
                                        cy="60"
                                        r="10"
                                        stroke="#00CC66"
                                        strokeWidth="5"
                                        fill="none"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={
                                        (1 - item.progress / 100) * 251.2
                                        }
                                        strokeLinecap="round"
                                    />
                                    </Svg>
                                    {/* <Text style={styles.progressText}>
                                    {item.progress}%
                                    </Text> */}
                                </View>
                                </View>
                            ) : (
                                /* Circular Delete Button After Upload Completes */
                                <TouchableOpacity
                                onPress={() => removeFile(item.name)}
                                style={styles.deleteButton}
                                >
                                <MaterialIcons
                                    name="delete"
                                    size={24}
                                    color="#ff0000"
                                />
                                </TouchableOpacity>
                            )}
                            </View>
                            {/* <TouchableOpacity onPress={() => removeFile(item.name)}>
                            <MaterialIcons name="delete" size={24} color="red" />
                            </TouchableOpacity> */}
                        </View>
                        )}
                        contentContainerStyle={{ paddingVertical: 1 }} // Reduce vertical padding
                        ItemSeparatorComponent={() => <View style={{ height: 2 }} />} // Reduce gap between items
                    />
                    </View>

                    <TouchableOpacity
                    style={styles.addDocumentButton}
                    onPress={pickDocument}
                    >
                    <Text style={styles.addDocumentText}>+ Add New Document</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.file_Container}></View>
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
    flexDirection: "row",
    height: "100%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#000000",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#ff0000",
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
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    //borderWidth: 1,
    // marginVertical: "0%",
    // marginHorizontal: "0%",
  },
  Right: {
    height: "100%",
    width: "100%",
    //borderWidth: 1,
  },
  header: {
    width:"12%",
    marginLeft: "70%",
    marginTop: 15,
    // borderColor: "#FFFFFF",
    // borderWidth: 1,
  },
  medilocker_Container: {
    flex: 1,
    height: "55%",
    width: "90%",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: "-2.5%",
    marginVertical: "-2%",
    transform: [{ scale: 0.9 }],
    flexDirection: "column",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  DashedBox: {
    height: "58%",
    width: "96%",
    //borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: "2%",
    marginVertical: "1.6%",
    overflow: "hidden",
  },
  dashedBorder: {
    width: "100%",
    height: "100%",
  },

  uploadTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 700,
    marginVertical: "1%",
  },
  uploadIcon: {
    alignSelf: "center",
    height: "25%",
    width: "10%",
    resizeMode: "contain",
  },
  uploadText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 500,
    paddingVertical: "1%",
  },
  uploadLink: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 600,
    color: "#0961BB",
    textDecorationLine: "underline",
  },
  files_Upload: {
    fontSize: 21,
    fontWeight: 700,
    color: "#000000",
    marginHorizontal: "3.5%",
    marginVertical: "-0.5%",
  },
  fileList: {
    height: "23%",
    width: "75%",
    //borderWidth: 2,
    borderColor: "#000000",
    flexDirection: "row",
    marginVertical: "1%",
    marginHorizontal: "2%",
  },
  fileItem: {
    flexDirection: "row",
    height: "90%",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: "-2.8%",
  },
  checkbox: {
    paddingVertical: "5%",
    alignSelf: "center",
  },
  fileIcon: {
    marginVertical: "0.6%",
    marginHorizontal: "1%",
  },
  fileDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    borderWidth: 2,
    height: "100%",
  },
  fileDetails: {
    flexDirection: "column",
    height: "100%",
    width: "30%",
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: "0%",
  },
  fileName: {
    marginHorizontal: "10%",
    fontSize: 18,
    fontWeight: 400,
    marginBottom: "0.5%",
    color: "#444444",
  },
  fileSize: {
    fontSize: 16,
    marginHorizontal: "10%",
    paddingBottom: "12%",
    color: "rgba(155, 154, 154, 1)",
  },
  circularProgressContainer: {
    // flex:1,
    // flexDirection:"column",
    // marginHorizontal:"20%",
  },
  circularProgress: {
    alignItems: "center",
    justifyContent: "center",
    //marginLeft: "auto",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
    //textAlign:"center",
    color: "#00CC66",
    marginBottom: "15%",
  },
  deleteButton: {
    color: "#ff0000",
  },
  addDocumentButton: {
    height: "10%",
    width: "17%",
    borderWidth: 1,
    borderColor: "#FF7072",
    marginHorizontal: "80%",
    marginVertical: "-3.8%",
    borderRadius: 6,
  },
  addDocumentText: {
    fontSize: 18,
    fontWeight: 400,
    alignSelf: "center",
    paddingVertical: "3%",
  },

  file_Container: {
    height: "42%",
    width: "90%",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: "-2.5%",
    marginVertical: "-0.3%",
    transform: [{ scale: 0.9 }],
  },
  // Chat: {
  //   borderWidth: 2,
  //   height: "12%",
  //   width: "102%",
  //   backgroundColor:"#FFFFFF",
  //   marginHorizontal:"3.3%",
  //   marginVertical:"-0.5%",
  //   borderRadius:15
  // },
});
export default Medilocker;
