import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import loginImg from "../assets/images/login.png";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../utils/common";

const ChatItem = ({ item, router, noBorder }) => {
    const openChatRoom = () => {
        router.push({pathname: '/chatroom', params: item});
    }

  return (
    <TouchableOpacity
    onPress={openChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3 mb-3 pb-2 ${
        noBorder ? "" : "border-b border-b-neutral-200"
      }`}
    >
      <Image
        source={item?.profileUrl}
        style={{ height: hp(6), width: hp(6) }}
        className="rounded-full"
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            time
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last Message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
