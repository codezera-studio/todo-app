import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>
        This is the Todos screen
      </Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>
          Toggle Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    color: "red"
  }
})