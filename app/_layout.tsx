import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' }} /> 
    </Tabs>
  );
}

//settings need to be inside profile stacklist 
