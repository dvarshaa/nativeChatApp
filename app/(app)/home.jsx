import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../../firebaseConfig";

const Home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(user?.uid) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    try {
      const q = query(usersRef); // Fetch all users
      const querySnapshot = await getDocs(q);
      let data = [];
  
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.userId !== user?.uid) {
          data.push({ ...userData });
        }
      });
  
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  

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
