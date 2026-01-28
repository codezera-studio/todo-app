import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const TodoInput = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      await addTodo({ text: newTodo.trim() });
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
      Alert.alert("Error", "Failed to add todo. Please try again.");
    }
  }

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder='What needs  to be done?'
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          // multiline
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()}
        >
          <LinearGradient colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted} style={[styles.addButton, !newTodo.trim() && styles.addButtonDisabled]}>
            <Ionicons name='add' size={24} color={'#fff'} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoInput