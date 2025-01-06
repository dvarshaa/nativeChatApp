import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";

const ChatList = ({ users }) => {
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, idx}) => <ChatItem item={item} idx={idx}/>}
      />
    </View>
  );
};

export default ChatList;
