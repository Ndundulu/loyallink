import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import {  Stack } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
export default function RootLayout() {
  return  (
<ClerkProvider tokenCache={tokenCache}>  
 <Stack screenOptions={{headerShown: false}}/>
</ClerkProvider>
)
}
