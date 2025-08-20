import { Image } from "expo-image";
import { Text, View, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window")
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
