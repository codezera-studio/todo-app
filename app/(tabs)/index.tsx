import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import LoadingSpinner from "@/components/loading-spinner";
import TodoInput from "@/components/todo-input";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const [editText, setEditText] = useState<string>("");
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if (isLoading) {
    return <LoadingSpinner />
  }

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error("Failed to toggle todo item:", error);
      Alert.alert("Error", "Failed to toggle todo item.");
    }
  }

  const handleRemoveTodo = async (id: Id<"todos">) => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => deleteTodo({ id }) }
    ])
  }

  const handleEditTodo = (item: Todo) => {
    setEditingId(item._id);
    setEditText(item.text);
  }

  const handleSaveEdit = async () => {
    if (editingId === null) return;

    try {
      await updateTodo({ id: editingId, text: editText.trim() });
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Failed to update todo item:", error);
      Alert.alert("Error", "Failed to update todo item.");
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {

    const isEditing = item._id === editingId;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={homeStyles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted} style={[homeStyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]}>
              {item?.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
            </LinearGradient>s
          </TouchableOpacity>
          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark" color="#fff" size={16} />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    <Ionicons name="close" color="#fff" size={16} />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text style={[homeStyles.todoText, item.isCompleted && {
                textDecorationLine: 'line-through',
                color: colors.textMuted,
                opacity: 0.6,
              }]}>
                {item.text}
              </Text>
              <View style={homeStyles.todoActions}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleEditTodo(item)}>
                  <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" color="#fff" size={14} />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleRemoveTodo(item._id)}>
                  <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" color="#fff" size={14} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient >
      </View >
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView
        style={homeStyles.safeArea}
      >
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}