import { View, Text, Platform, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "../context/authContext";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MenuItem from "./CustomMenuItem";
import { AntDesign, Feather } from "@expo/vector-icons";

const HomeHeader = () => {
  const { user, logout } = useAuth();

  const handleProfile = () => {};

  const handleLogOut = async () => {
    await logout();
  };

  return (
    <SafeAreaView
      style={{ padding: 20 }}
      className="flex-row justify-between px-5 bg-indigo-400 rounded-b-3xl shadow"
    >
      <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
        Chats
      </Text>
      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={{ blurhash }}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions customStyles={menuOptionsStyles}>
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Sign Out"
              action={handleLogOut}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200" />;
};

const menuOptionsStyles = {
  optionsContainer: {
    borderRadius: 20,
    marginTop: 40,
    backgroundColor: "#EEEEEE",
    width: 160,
  },
};
