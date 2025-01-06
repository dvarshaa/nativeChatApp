import { View, Text } from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

import { MenuOption } from "react-native-popup-menu";
const MenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)} customStyles={optionStyles}>
        <View className="px-4 py-1 flex-row justify-between items-center">
            <Text style={{fontSize: hp(1.7)}} className="font-semibold text-neutral-600">{text}</Text>
            {icon}
        </View>
    </MenuOption>
  );
};

export default MenuItem;

const optionStyles = {
    optionText: {
      color: '757575',
      fontWeight: 700,
      fontSize: 40,
    },
};
