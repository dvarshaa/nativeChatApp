import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ChatRoom = () => {
    const item = useLocalSearchParams();
    console.log(item);
    
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  )
}

export default ChatRoom