import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <View>
        <Text>Home</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </>
  );
};

export default Home;
