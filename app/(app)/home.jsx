import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";

const Home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([1,2,3]);

  useEffect(() => {
    if(user?.uid) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {

  }
  

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users?.length && (<ChatList users={users} />)}
      {!users?.length && (<View style={{top: hp(30)}} className="flex items-center">
        <ActivityIndicator size="large" color="#3949AB"/>
      </View>)}
    </View>
  );
};

export default Home;
