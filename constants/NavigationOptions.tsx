import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "./CustomHeaderButton";
import { Platform, TextInput, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const NavigationOptionsHome = (navData, HeaderHight) => {
    return {
        headerStyle: {
            backgroundColor: "White",
        },
        headerTitleStyle: {
            fontFamily: "youtube-sans-bold",
        },
        headerTintColor: "black",
        title: "D3Player",
        headerLeft: () => {
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="D3Player"
                style={{ paddingLeft: 10 }}
                iconName={
                    Platform.OS === "android" ? "md-logo-youtube" : "ios-logo-youtube"
                }
                color="red"
                iconSize={30}
                iconSet={Ionicons}
                />
            </HeaderButtons>
        },
        headerRight: () => {
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                title="Menu"
                iconName="cast"
                color="black"
                iconSize={24}
                iconSet={MaterialIcons}
                />
                <Item
                title="Menu"
                iconName={
                    Platform.OS === "android"
                    ? "md-notifications-outline"
                    : "ios-notifications-outline"
                }
                color="black"
                iconSize={24}
                iconSet={Ionicons}
                />
                <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-search" : "ios-search"}
                color="black"
                iconSize={24}
                iconSet={Ionicons}
                onPress={() => {
                    navData.navigation.navigate("SearchScreen", {
                    HeaderHight: HeaderHight,
                    });
                }}
                />
                <Item
                title="Menu"
                iconName="account-circle"
                color="black"
                iconSize={26}
                iconSet={MaterialIcons}
                />
            </HeaderButtons>
        }
    };
};

export const NavOptionsdefualtSearchdata = (
    HeaderHight,
    onChangSearchText,
    SearchedText,
    OnSubmitEditing,
    SetInputState) => {
        return {
            headerTitle: () => (
                <View>
                    <TextInput 
                    returnKeyType="search"
                    onFocus={() => {
                        SetInputState(true);
                    }}
                    onBlur={() => {
                      SetInputState(false);
                    }}
                    onSubmitEditing={() => OnSubmitEditing()}
                    value={SearchedText}
                    onChangeText={(value) => onChangSearchText(value)}
                    placeholder="Search PlaceHolder"
                    placeholderTextColor="gray"
                    style={{
                        backgroundColor: "#e6e6e6",
                        fontSize: HeaderHight / 5,
                        width: "100%",
                    }}
                    />
                </View>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="Search"
                    style={{ left: 0, padding: 0, margin: 0 }}
                    iconName={Platform.OS === "android" ? "md-mic" : "ios-mic"}
                    color="black"
                    iconSize={28}
                    iconSet={Ionicons}
                    />
                </HeaderButtons>
            ),
        };
    };