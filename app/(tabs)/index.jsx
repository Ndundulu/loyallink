import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
	    backgroundColor: "white"
      }}
    >
      <Image source={require("../assets/images/logo.png")} style={{width: width/2, height: height/2}} contentFit="contain"/>
    </View>
  );
}
