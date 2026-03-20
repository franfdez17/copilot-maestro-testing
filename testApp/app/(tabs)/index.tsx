import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';

export default function HomeScreen() {
  const [screen, setScreen] = useState('login');
  const [items] = useState([
    { id: '1', name: 'Valencia' },
    { id: '2', name: 'Madrid' },
    { id: '3', name: 'Barcelona' }
  ]);

  if (screen === 'login') {
    return (
      <View style={{ padding: 20, marginTop: 60 }}>
        <Text style={{ fontSize: 24 }}>Login</Text>

        <TextInput placeholder="Email" style={{ borderWidth: 1, marginTop: 10 }} />
        <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginTop: 10 }} />

        <TouchableOpacity
          style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}
          onPress={() => setScreen('home')}
        >
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>

        <Pressable onPress={() => setScreen('register')}>
          <Text style={{ marginTop: 10 }}>Go to Register</Text>
        </Pressable>
      </View>
    );
  }

  if (screen === 'register') {
    return (
      <View style={{ padding: 20, marginTop: 60 }}>
        <Text style={{ fontSize: 24 }}>Register</Text>

        <TextInput placeholder="Name" style={{ borderWidth: 1, marginTop: 10 }} />
        <TextInput placeholder="Email" style={{ borderWidth: 1, marginTop: 10 }} />

        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 10, marginTop: 10 }}
          onPress={() => setScreen('login')}
        >
          <Text style={{ color: 'white' }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ padding: 20, marginTop: 60 }}>
      <Text style={{ fontSize: 24 }}>Destinos</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1 }}
            onPress={() => alert(item.name)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Pressable
        style={{ marginTop: 20 }}
        onPress={() => setScreen('login')}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}