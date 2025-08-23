import { useUser } from "@clerk/clerk-expo";
import { StyleSheet, Text } from "react-native";

const Greeting = () => {
  const { user } = useUser();

  const hour = new Date().getHours();
  let timeGreeting = "Hi";

  if (hour >= 5 && hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    timeGreeting = "Good afternoon";
  } else if (hour >= 17 && hour < 21) {
    timeGreeting = "Good evening";
  } else {
    timeGreeting = "Good night";
  }

  return (
    <Text style={styles.greetings}>
      {timeGreeting}, {user?.firstName || user?.username || "Guest"} 👋
    </Text>
  );
};

const styles = StyleSheet.create({
  greetings: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
});

export default Greeting;

