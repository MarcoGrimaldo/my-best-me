import React from "react";
import { View } from "react-native";
import HabitList from "./HabitList";

const HabitScreen = ({ navigation }) => {
  return (
    <View>
      <HabitList navigation={navigation} />
    </View>
  );
};

export default HabitScreen;
