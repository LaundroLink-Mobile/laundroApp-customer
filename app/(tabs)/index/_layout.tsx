// app/(tabs)/index/_layout.tsx
import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Home main screen */}
      <Stack.Screen name="index" />
      {/* Search screen within the Home tab */}
      <Stack.Screen name="search_laundry" />
    </Stack>
  );
}
