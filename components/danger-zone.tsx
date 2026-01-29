import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { api } from '@/convex/_generated/api'
import { useTheme } from '@/hooks/use-theme'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

const DangerZone = () => {
  const { colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const handleResetApp = () => {
    Alert.alert(
      "Reset App",
      "Are you sure you want to reset the app? This will delete all your todos and cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              await clearAllTodos();
              Alert.alert("App Reset", "All todos have been deleted.");
            } catch (error) {
              console.error("Error resetting app:", error);
              Alert.alert("Error", "There was an error resetting the app. Please try again.");
            }
          }
        }
      ]
    )
  }

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>

      <TouchableOpacity
        style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
        onPress={handleResetApp}
        activeOpacity={0.7}
      >
        <View style={settingsStyles.actionLeft}>
          <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}
          >
            <Ionicons name='trash' size={18} color="#ffffff" />
          </LinearGradient>
          <Text style={settingsStyles.actionTextDanger}>
            Reset App
          </Text>
        </View>
        <Ionicons name='chevron-forward' size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default DangerZone