import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import loginImg from "../assets/images/login.png";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash, getRoomId } from "../utils/common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { formatDate } from "../utils/common";

const ChatItem = ({ item, router, noBorder, currentUser }) => {
    const [lastMessage, setLastMessage] = useState(undefined);

  const openChatRoom = () => {
    router.push({ pathname: "/chatroom", params: item });
  };

  const renderTime = () => {
    if(lastMessage) {
        const date = lastMessage?.createdAt;
        return formatDate(new Date (date?.seconds * 1000));
    }
  }

  const renderLastMessage = () => {
    if(typeof lastMessage == 'undefined') return 'Loading...';
    if(lastMessage) {
        if(lastMessage?.userId == currentUser?.userId) {
            return "You: "+lastMessage?.text;
        }
        return lastMessage?.text;
    } else {
        return 'Say Hi 👋🏻';
    }
  }

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");

    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

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
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
