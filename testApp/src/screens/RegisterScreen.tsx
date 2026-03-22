import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { COLORS, SHADOWS, RADIUS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const RegisterScreen = ({ name, setName, email, setEmail, password, setPassword, handleRegister, isLoading, navigateTo, errorMessage, successMessage }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: '#eff6ff' }]}>
              <Ionicons name="person-add" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Join our community and start testing.</Text>
          </View>

          <View style={styles.form}>
            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={20} color={COLORS.error} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {successMessage ? (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            ) : null}
            
            <CustomInput label="Full Name" placeholder="Jane Doe" value={name} onChangeText={setName} />
            
            <CustomInput 
              label="Email Address" 
              placeholder="test@example.com" 
              value={email} 
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            
            <CustomInput 
              label="Password" 
              placeholder="6+ characters" 
              secureTextEntry 
              value={password} 
              onChangeText={setPassword} 
            />

            <CustomButton title="Create Account" onPress={handleRegister} isLoading={isLoading} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigateTo('login')}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: SPACING.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: COLORS.text, 
    marginBottom: SPACING.xs,
  },
  subtitle: { 
    fontSize: 15, 
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SPACING.sm,
  },
  form: { 
    width: '100%',
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: SPACING.xl,
  },
  footerText: { 
    fontSize: 14, 
    color: COLORS.textLight,
  },
  linkText: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: COLORS.primary,
  },
  errorBox: { 
    backgroundColor: '#fff1f2', 
    padding: SPACING.md, 
    borderRadius: RADIUS.md, 
    marginBottom: SPACING.lg, 
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecdd3',
  },
  errorText: { 
    color: COLORS.error, 
    fontSize: 14, 
    fontWeight: '600', 
    marginLeft: SPACING.sm,
    flex: 1,
  },
  successBox: { 
    backgroundColor: '#ecfdf5', 
    padding: SPACING.md, 
    borderRadius: RADIUS.md, 
    marginBottom: SPACING.lg, 
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  successText: { 
    color: COLORS.success, 
    fontSize: 14, 
    fontWeight: '600', 
    marginLeft: SPACING.sm,
    flex: 1,
  },
});
