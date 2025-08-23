import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; // For text fade-in animation

  // Redirect to sign-in after a delay if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      // Start fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2500, // 1.5 seconds for fade-in
        useNativeDriver: true,
      }).start();

      // Redirect after 3 seconds
      const timer = setTimeout(() => {
        router.replace("/sign-in");
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isSignedIn, router, fadeAnim]);

  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <LinearGradient
      colors={["#fff", "#fff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Animated.Text style={[styles.slogan, { opacity: fadeAnim }]}>
          Loyalty taken to the next level
        </Animated.Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.5,
    marginBottom: 20,
  },
  slogan: {
    fontSize: 20,
    fontWeight: "600",
    color: "#696868",
    textAlign: "center",
    letterSpacing: 0.5,
    opacity: 0, // Initial opacity for fade-in
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
