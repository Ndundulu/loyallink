import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Basic input validation
    if (!emailAddress || !password) {
      setError("Please enter both email and password.");
      setModalVisible(true);
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setError("Please enter a valid email address.");
      setModalVisible(true);
      return;
    }

    // Password length validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      // Extract specific error message from Clerk's error response
      const errorMessage =
        err.errors?.[0]?.message || "An error occurred during sign-up.";
      setError(errorMessage);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    // Basic code validation
    if (!code) {
      setError("Please enter the verification code.");
      setModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("(tabs)/Home");
      } else {
        setError("Verification failed. Please check the code and try again.");
        setModalVisible(true);
      }
    } catch (err) {
      // Extract specific error message from Clerk's error response
      const errorMessage =
        err.errors?.[0]?.message || "An error occurred during verification.";
      setError(errorMessage);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Close error modal
  const closeModal = () => {
    setModalVisible(false);
    setError(null);
  };

  return (
    <LinearGradient
      colors={["#33CC33", "#3366CC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        {pendingVerification ? (
          <>
            <Text style={styles.title}>Verify Email</Text>
            <Text style={styles.subtitle}>
              We sent you a code. Enter it below to verify your email.
            </Text>

            <TextInput
              style={[styles.input, error && !code && styles.inputError]}
              placeholder="Verification Code"
              placeholderTextColor="#ccc"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onVerifyPress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#3366CC" />
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>LoyaLink</Text>
            <Text style={styles.subtitle}>Create your account</Text>

            <TextInput
              style={[styles.input, error && !emailAddress && styles.inputError]}
              placeholder="Email"
              placeholderTextColor="#ccc"
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              onChangeText={setEmailAddress}
              editable={!loading}
            />

            <TextInput
              style={[styles.input, error && !password && styles.inputError]}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onSignUpPress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#3366CC" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>

            <View style={styles.row}>
              <Text style={styles.smallText}>Already have an account? </Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity disabled={loading}>
                  <Text
                    style={[styles.linkText, loading && styles.linkTextDisabled]}
                  >
                    Sign in
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </>
        )}
      </KeyboardAvoidingView>

      {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalMessage}>{error}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 12,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    marginBottom: 32,
    textAlign: "center",
    opacity: 0.8,
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  inputError: {
    borderColor: "#FF4D4D",
    borderWidth: 2,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: "#f0f0f0",
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3366CC",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.9,
  },
  linkText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  linkTextDisabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#3366CC",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
