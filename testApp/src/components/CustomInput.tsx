import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

export const CustomInput = ({ label, placeholder, secureTextEntry, value, onChangeText, keyboardType }: any) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { 
    marginBottom: SPACING.lg,
  },
  inputLabel: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: COLORS.text, 
    marginBottom: SPACING.sm,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    height: 58,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  input: { 
    fontSize: 16, 
    color: COLORS.text,
    fontWeight: '500',
    height: '100%',
  },
});
