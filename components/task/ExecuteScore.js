import React from "react";
import { Text, View } from "react-native";
import Root from "../../root";
import Header2 from "../../routes/header/Header2";

export default function ExecuteScore({ navigation }) {
  return (
    <Root
      Header={<Header2 title={"ប្រតិបត្តិពិន្ទុ"} navigation={navigation} />}
    >
      <View>
        <Text>ExecuteScore Screen</Text>
      </View>
    </Root>
  );
}
