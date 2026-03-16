import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Pressable, StyleSheet } from 'react-native';

const ExampleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      
      <TouchableOpacity style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
      
      <Button
        title="Forgot Password"
        onPress={() => {}}
      />
      
      <Pressable style={styles.link} onPress={() => console.log('Navigate')}>
        <Text>Go to Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ExampleScreen;
