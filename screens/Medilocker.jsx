import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  useWindowDimensions,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import * as DocumentPicker from "expo-document-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import * as FileSystem from "expo-file-system";

const Medilocker = ({ navigation }) => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const {width} = useWindowDimensions();
  
  useEffect(() => {
    const loadFiles = async () => {
      const storedFiles = await AsyncStorage.getItem("files");
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      }
    };
    loadFiles();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  const convertFileToBase64 = async (fileUri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:application/octet-stream;base64,${base64}`; // Base64 with MIME type
    } catch (error) {
      console.error("Error converting file to Base64:", error);
      return null;
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.canceled === true) {
        return;
      }
      if (!result.assets || result.assets.length === 0) {
        alert("Error ,No file data received.");
        return;
      }
      const fileUri = result.assets[0].uri;
      const fileName = result.assets[0].name || "Unknown File";
      let fileType = result.assets[0].mimeType || "Unknown Type";
      const fileSizeBytes = result.assets[0].size ?? null;
      let fileSize = fileSizeBytes ? `${(fileSizeBytes / 1024).toFixed(2)} KB` : "Unknown Size";

      if (fileType !== "Unknown Type") {
        const parts = fileType.split("/");
        if (parts.length > 1) {
          fileType = parts[1].split(".").pop();
        }
      }

      const base64String = await convertFileToBase64(fileUri);

      const newFile = {
          name: fileName,
          size: fileSize,
          type: fileType,
          progress: 100,
          date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString() ,
            base64: base64String,
          };
      setFiles((prevFiles) => [...prevFiles, newFile]);
      
    } catch (err) {

      alert("Error ,Something went wrong while picking the file.");
    }
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
    Alert.alert("Deleted", `${fileName} has been removed`);
  };

  const filteredFiles = files.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const[visible,setvisible]=useState(true);
  const [password, setPassword] = useState("");


  const handlePasswordChange = (text)=> {
    setPassword(text);
    if (text === "1234") {
      setTimeout(() => setvisible(false), 500); // Close modal after 0.5s if password is correct
    }
  };

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

              <View style={styles.header}><Header navigation={navigation}/></View>

              <View style={styles.right_middle}>
           
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

                    <TouchableOpacity
                    style={styles.addDocumentButton}
                    onPress={pickDocument}
                    >
                    <Text style={styles.addDocumentText}>+ Add New Document</Text>
                    </TouchableOpacity>
                </View>


              </View>

              <View style={styles.right_bottom}>

                <View style={styles.file_Container}>
                  {/* Header Section */}
                  <View style={styles.Fpart}>
                    <View style={styles.searchFilterContainer}>
                      <Text style={styles.tableTitle}>Files Uploaded</Text>

                      <View style={styles.searchBox}>
                        <MaterialIcons name="search" size={20} color="red" />
                        <TextInput
                          style={styles.searchInput}
                          placeholder="Search for Documents"
                          value={searchQuery}
                          onChangeText={setSearchQuery}
                        />
                      </View>

                      <TouchableOpacity style={styles.filterButton}>
                        <MaterialIcons name="filter-list" size={20} color="red" />
                        <Text style={styles.filterText}>Filters</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                    {/* Table Section */}
                    <View style={styles.Spart}>
                      <FlatList
                        data={filteredFiles}
                        keyExtractor={(item) => item.name}
                        ListHeaderComponent={
                          <View style={styles.tableHeader}>
                            <Text style={styles.headerText}>File Name</Text>
                            <Text style={styles.headerText}>Document Type</Text>
                            <Text style={styles.headerText}>File Size</Text>
                            <Text style={styles.headerText}>Creation Date</Text>
                            <Text style={styles.headerText}>Time</Text>
                            <Text style={styles.headerText}>Actions</Text>
                          </View>
                        }
                        renderItem={({ item }) => (
                          <View style={styles.tableRow}>
                            <Text style={styles.rowText}>{item.name}</Text>
                            <Text style={styles.rowText}>{item.type }</Text>
                            <Text style={styles.rowText}>{item.size}</Text>
                            <Text style={styles.rowText}>{item.date}</Text>
                            <Text style={styles.rowText}>{item.time}</Text>

                            <View style={styles.actionButtons}>
                      {/* Download Button */}
                      <TouchableOpacity onPress={() => downloadFile(item)}>
                        <MaterialIcons name="file-download" size={24} color="red" />
                      </TouchableOpacity>

                      {/* Edit Button */}
                      <TouchableOpacity onPress={() => editFile(item)}>
                        <MaterialIcons name="edit" size={24} color="red" />
                      </TouchableOpacity>

                      {/* Delete Button */}
                      <TouchableOpacity onPress={() => removeFile(item.name)}>
                        <MaterialIcons name="delete" size={24} color="red" />
                      </TouchableOpacity>
                    </View>
                          </View>
                        )}
                      />
                    </View>
                  </View>
              </View>

              {visible && (
                <View style={styles.overlay}>
                  <View style={styles.overlayContent}>
                    <MaterialIcons name="lock" size={30} color="red" style={styles.icon} />
                    <Text style={styles.lockedText}>Medilocker is Locked</Text>
                    <Text style={styles.securityText}>
                      For your security, you can only use Medilocker when it's unlocked.
                    </Text>
                    <Text style={styles.enterPasswordText}>Enter Password</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor="#888"
                      secureTextEntry={true}
                      value={password}
                      onChangeText={handlePasswordChange}
                    />
                  </View>
                </View>
              )}

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
    // flex: 1,
    width: "100%",
  },
  header: {
    width: "12%",
    marginLeft: "70%",
    marginTop: 12,
  },
  right_middle: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  right_bottom: {
    flex: 1,
    width: "100%",
  },
  medilocker_Container: {
    flex: 1,
    //  height: "80%",
    width: "90%",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: "-2.5%",
    // marginVertical: "-2.5%",
    transform: [{ scale: 0.9 }],
    flexDirection: "column",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    // alignSelf: "center", // Ensures it's inside the parent
    maxHeight: "100%", // Prevents it from exceeding parent height
    overflow: "hidden",
  },
  DashedBox: {
    height: "75%",
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
  addDocumentButton: {
    height: "12%",
    width: "16%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FF7072",
    backgroundColor: "white",
    borderRadius: 4,
    marginTop: "15%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "1%", // Adjust to keep it above the bottom edge
    right: "5%",
  },
  addDocumentText: {
    fontSize: 18,
    fontWeight: 400,
    // alignSelf: "center",
    paddingVertical: "3%",
    color: "black",
  },
  file_Container: {
    // height: "95%",
    width: "90%",
    borderWidth: 0,
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: "-2.5%",
    // marginVertical: "-2.5%",
    transform: [{ scale: 0.9 }],
    flexDirection: "column",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    // alignSelf: "center", // Ensures it's inside the parent
    maxHeight: "100%",
    overflow: "hidden",
  },
  Fpart: {
    width: "100%",
    marginBottom: 10,
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 35,
    width: "27%",
    marginLeft: "50%",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  filterText: {
    color: "#180606b3",
    fontSize: 14,
    marginLeft: 5,
  },
  Spart: {
    width: "100%",
    // backgroundColor: "#f7ecf0",
    padding: 1,
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7ecf0",
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  rowText: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center", // Ensures equal spacing
    alignItems: "center",
  },
  passwardDialogBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    padding: "2%",
    borderRadius: "5%",
  },
  buttonText: {
    color: "white",
    fontSize: "90%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    marginRight: "15%",
  },
  overlayContent: {
    width: "25%", // Adjust as needed, e.g., 50% of Right view
    backgroundColor: "white",
    padding: "3%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: "2%",
  },
  lockedText: {
    fontSize: "90%",
    fontWeight: "bold",
    color: "black",
    marginBottom: "5%",
  },
  securityText: {
    fontSize: "80%",
    textAlign: "center",
    color: "gray",
    marginBottom: "8%",
  },
  enterPasswordText: {
    fontSize: "100%",
    fontWeight: "bold",
    color: "red",
    marginBottom: "5%",
  },
  input: {
    width: "90%",
    height: "20%",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: "5%",
    padding: "2%",
    textAlign: "center",
  },
});
export default Medilocker;