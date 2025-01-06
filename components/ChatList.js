import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

const ChatList = ({ users }) => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, idx }) => (
            
          <ChatItem
            noBorder={idx+1 == users?.length}
            router={router}
            item={item}
            idx={idx}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
