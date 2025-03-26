import React, { useState, useEffect, useContext } from "react";
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
  Dimensions,
  Platform,
} from "react-native";
import SideBarNavigation from "../components/SideBarNavigation";
import * as DocumentPicker from "expo-document-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../components/Header";
import * as FileSystem from "expo-file-system";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = "https://mphzlicqj3.execute-api.ap-south-1.amazonaws.com/prod/medilocker";

const Medilocker = ({ navigation }) => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { width } = useWindowDimensions();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
  
    const loadFilesFromServer = async () => {
      try {
        const response = await fetch(`${API_URL}/fetch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to load files from server");
        }
  
        const data = await response.json();
        if (data?.files) {
          const mappedFiles = data.files.map((file) => ({
            name: file.filename,
            type: file.metadata.file_type,
            size: file.metadata.file_size,
            date: file.metadata.upload_date,
            time: file.metadata.upload_time,
          }));
  
          setFiles(mappedFiles);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
  
    loadFilesFromServer();
  }, []);

  const convertFileToBase64 = async (asset) => {
    if (Platform.OS === 'web') {
      try {
        const response = await fetch(asset.uri);
        const blob = await response.blob();
  
        // Convert the blob to a data URL using FileReader
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result); 
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(blob);
        });

        const base64String = dataUrl.split(',')[1];
        return base64String;
      } catch (error) {
        console.error("Error converting file to Base64 on web:", error);
        return null;
      }
    } else {
      try {
        const base64String = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return base64String;
      } catch (error) {
        console.error("Error converting file to Base64:", error);
        return null;
      }
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
      const asset = result.assets[0];
      const fileName = asset.name || "Unknown File";
      let fileType = asset.mimeType || "Unknown Type";
      const fileSizeBytes = asset.size ?? null;
      let fileSize = fileSizeBytes ? `${(fileSizeBytes / 1024).toFixed(2)} KB` : "Unknown Size";

      if (fileType !== "Unknown Type") {
        const parts = fileType.split("/");
        if (parts.length > 1) {
          fileType = parts[1].split(".").pop();
        }
      }

      const base64String = convertFileToBase64(asset);
      if (!base64String) {
        alert("Error converting file to Base64.");
        return;
      }

      const newFile = {
        name: fileName,
        size: fileSize,
        type: fileType,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      
      const payload = {
        email: user?.email,
        files: [
          {
            filename: fileName,
            content: base64String,
            metadata: {
              file_type: fileType,
              file_size: fileSize,
              upload_date: newFile.date,
              upload_time: newFile.time,
            },
          },
        ],
      };
  
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      
      const data = await response.json();
      // console.log("Upload successful", data);
      
      setFiles((prevFiles) => [...prevFiles, newFile]);
    } catch (err) {
      alert(`Error: ${err.error}`);
    }
  };

  const downloadFile = async (fileName) => {
    try {
      const response = await fetch(`${API_URL}/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          filename: fileName,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Download request failed");
      }

      const data = await response.json();
      const downloadUrl = data.download_url;

      const fileUri = FileSystem.documentDirectory + fileName;
      
      const downloadResult = await FileSystem.downloadAsync(downloadUrl, fileUri);
      Alert.alert("Download Complete", `File downloaded to ${downloadResult.uri}`);
    } catch (error) {
      Alert.alert("Download Error", error.error);
    }
  };
  
  const removeFile = async (fileName) => {
    try {
      const response = await fetch(`${API_URL}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          filename: fileName,
        }),
      });

      if (!response.ok) {
        Alert.alert("Error", "Failed to remove file from server.");
        return;
      }

      const data = await response.json();

      setFiles(files.filter((file) => file.name !== fileName));
      Alert.alert("Deleted", `${fileName} has been removed`);
    } catch (error) {
      Alert.alert("Error", error.error);
    }
  };

  const editFile = async () => {
    
  }

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [visible, setvisible] = useState(true);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text === user?.password) {
      setTimeout(() => setvisible(false), 500); // Close modal after 0.5s if password is correct
    }
  };

  return (
    <>
      {(Platform.OS === "web" || width > 1000) && (
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
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>

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
                            <Text style={styles.uploadLink}>
                              Click to Browse
                            </Text>
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>

                      <TouchableOpacity
                        style={styles.addDocumentButton}
                        onPress={pickDocument}
                      >
                        <Text style={styles.addDocumentText}>
                          + Add New Document
                        </Text>
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
                            <MaterialIcons
                              name="search"
                              size={20}
                              color="red"
                            />
                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search for Documents"
                              value={searchQuery}
                              onChangeText={setSearchQuery}
                            />
                          </View>

                          <TouchableOpacity style={styles.filterButton}>
                            <MaterialIcons
                              name="filter-list"
                              size={20}
                              color="red"
                            />
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
                              <Text style={styles.headerText}>
                                Document Type
                              </Text>
                              <Text style={styles.headerText}>File Size</Text>
                              <Text style={styles.headerText}>
                                Creation Date
                              </Text>
                              <Text style={styles.headerText}>Time</Text>
                              <Text style={styles.headerText}>Actions</Text>
                            </View>
                          }
                          renderItem={({ item }) => (
                            <View style={styles.tableRow}>
                              <Text style={styles.rowText}>{item.name}</Text>
                              <Text style={styles.rowText}>{item.type}</Text>
                              <Text style={styles.rowText}>{item.size}</Text>
                              <Text style={styles.rowText}>{item.date}</Text>
                              <Text style={styles.rowText}>{item.time}</Text>

                              <View style={styles.actionButtons}>
                                {/* Download Button */}
                                <TouchableOpacity
                                  onPress={() => downloadFile(item.name)}
                                >
                                  <MaterialIcons
                                    name="file-download"
                                    size={24}
                                    color="red"
                                  />
                                </TouchableOpacity>

                                {/* Edit Button */}
                                <TouchableOpacity
                                  onPress={() => editFile(item)}
                                >
                                  <MaterialIcons
                                    name="edit"
                                    size={24}
                                    color="red"
                                  />
                                </TouchableOpacity>

                                {/* Delete Button */}
                                <TouchableOpacity
                                  onPress={() => removeFile(item.name)}
                                >
                                  <MaterialIcons
                                    name="delete"
                                    size={24}
                                    color="red"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  </View>

                  {(!user && visible) && (
                    <View style={styles.overlay}>
                      <View style={styles.overlayContent}>
                        <MaterialIcons
                          name="lock"
                          size={30}
                          color="red"
                          style={styles.icon}
                        />
                        <Text style={styles.lockedText}>
                          Medilocker is Locked
                        </Text>
                        <Text style={styles.securityText}>
                          For your security, you can only use Medilocker when
                          you are logged in.
                        </Text>
                        <Text style={styles.enterPasswordText}>
                          Enter Password
                        </Text>
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
      )}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <View style={styles.appHeader}>
            <Header navigation={navigation} />
          </View>
          <View style={styles.appMedilockerContainer}>
            <Text style={styles.appTitle}>Medilocker</Text>
            <TouchableOpacity
              style={styles.appMenuButton}
              onPress={() => alert("menu clicked!")}
            >
              <MaterialIcons name="more-horiz" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.appSearchBox}>
            <View style={styles.appSearchContainer}>
              {/* Search Icon */}
              <MaterialIcons
                name="search"
                size={20}
                color="salmon"
                style={styles.appIcon}
              />

              {/* Search Input */}
              <TextInput
                style={styles.appSearchInput}
                placeholder="Search in Medilocker"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              {/* Filter Button */}
              <TouchableOpacity onPress={() => alert("Filter Clicked!")}>
                <FontAwesome name="filter" size={18} color="salmon" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.appDocuContainer}>
            <Text style={styles.appDocuTitle}>Documents</Text>
            <TouchableOpacity
              style={styles.applistButton}
              onPress={() => alert("menu clicked!")}
            >
              <MaterialIcons
                name="format-list-bulleted"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredFiles}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.fileItem}>
                <TouchableOpacity
                  onPress={() => {}}
                >
                  <Image
                    source={require("../assets/Icons/FileIcon.png")}
                    style={styles.fileIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.fileName}>{item.name}</Text>
                <Text style={styles.fileDate}>You Created - {item.date}</Text>
                <TouchableOpacity onPress={() => removeFile(item.name)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.appAddDocument}>
            <TouchableOpacity style={styles.appFeb} onPress={pickDocument}>
              {/* <Text style={styles.addDocumentText}>+ </Text> */}
              <AntDesign name="plus" size={24} color="red" />
            </TouchableOpacity>
          </View>

          {(!user && visible) && (
            <View style={styles.overlay}>
              <View style={styles.overlayContent}>
                <MaterialIcons
                  name="lock"
                  size={30}
                  color="red"
                  style={styles.icon}
                />
                <Text style={styles.lockedText}>
                  Medilocker is Locked
                </Text>
                <Text style={styles.securityText}>
                  For your security, you can only use Medilocker when
                  you are logged in.
                </Text>
                <Text style={styles.enterPasswordText}>
                  Enter Password
                </Text>
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
      )}
    </>
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
    borderRadius: 5,
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
    ...Platform.select({
      web:{
        marginRight: "15%",
      }
    })
  },
  overlayContent: {
    width: "75%", // Adjust as needed, e.g., 50% of Right view
    backgroundColor: "white",
    padding: "3%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web:{
        width: "25%",
      }
    })
  },
  icon: {
    marginBottom: "2%",
  },
  lockedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: "5%",
  },
  securityText: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
    marginBottom: "8%",
  },
  enterPasswordText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: "5%",
  },
  input: {
    width: "90%",
    height: "20%",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    padding: "2%",
    textAlign: "center",
  },
  appContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFF",
  },
  appHeader: {
    // marginTop:"%",
    height: "20%",
  },
  appMedilockerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 16,
    // paddingVertical: 10,
    backgroundColor: "white",
    paddingLeft: "6%",
    paddingRight: "6%",
  },
  appTitle: {
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: "30%",
  },
  appMenuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  appSearchBox: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "6%",
    paddingRight: "6%",
  },
  appSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    // paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 9, // For Android shadow effect
    width: "100%", // Responsive width
  },
  appIcon: {
    marginRight: 8,
  },
  appSearchInput: {
    flex: 1,
    fontSize: 12,
    color: "#333",
  },
  appDocuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 16,
    // paddingVertical: 10,
    backgroundColor: "white",
    paddingLeft: "6%",
    paddingRight: "6%",
    marginTop: "1%",
  },
  appDocuTitle: {
    fontSize: 18,
    // fontWeight: "bold",
    // paddingLeft:"30%",
  },
  applistButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 5,
  },
  fileItem: {
    width: "30%",
    alignItems: "center",
    margin: 8,
    marginTop: "10%",
  },
  fileIcon: {
    width: 50,
    height: 50,
    tintColor: "salmon", // Match color of icon
  },
  fileName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  fileDetails: {
    fontSize: 10,
    color: "gray",
    textAlign: "center",
  },
  fileMenu: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  appAddDocument: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    paddingBottom: "20%",
  },
  appFeb: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android shadow effect
  },
});
export default Medilocker;
