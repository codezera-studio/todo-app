import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,   
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'green',
      tabBarStyle:
      {
        backgroundColor: '#1e293b ',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        height: 90,
        paddingBottom: 30,
        paddingTop: 10
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 600
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todos',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="flash-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
