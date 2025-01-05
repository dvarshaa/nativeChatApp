import { View, Text } from 'react-native'
import React from 'react'

const Loading = ({size}) => {
  return (
    <View style={{height: size, aspectRatio: 1}}>
      <Text>Loading</Text>
    </View>
  )
}

export default Loading