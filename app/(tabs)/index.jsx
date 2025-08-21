import { Text, View, Image, Dimensions } from "react-native";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
            }}
        >
            <Image
                source={require("../../assets/images/logo.png")}
                style={{ width: width / 2, height: height / 2 }}
                resizeMode="contain"
            />
        </View>
    );
}