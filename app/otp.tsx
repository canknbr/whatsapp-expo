import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';

const TR_PHONE = [
  `+`,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
const OtpPage = () => {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const { bottom } = useSafeAreaInsets();
  const openLink = () => {
    Linking.openURL('https://example.com/privacy-policy');
  };
  const sendOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify/${phoneNumber}`)
    }, 200);
  };
  const trySignIn = () => {};
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        {!loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size={'large'} color={Colors.primary} />
            <Text style={{ marginTop: 10, fontSize: 18 }}>Sending Code...</Text>
          </View>
        )}
        <Text style={styles.description}>
          App will need to verify your account. Carrier charges may apply.
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Türkiye</Text>
            <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
          </View>
          <View style={styles.separator} />
          <MaskInput
            style={styles.input}
            value={phoneNumber}
            keyboardType="numeric"
            placeholder="+90 your phone number"
            autoFocus
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={TR_PHONE}
          />
        </View>
        <Text style={styles.legal}>
          You must be
          <Text style={styles.link} onPress={openLink}>
            {' '}
            at least 16 years old{' '}
          </Text>
          to register. Learn how App works with the{' '}
          <Text style={styles.link}>App Companies</Text>
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          disabled={phoneNumber == ''}
          onPress={sendOTP}
          style={[
            styles.button,
            phoneNumber !== '' ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== '' ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
  },
  list: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
  },
  legal: { fontSize: 12, textAlign: 'center', color: '#000' },
  link: {
    color: Colors.primary,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
});
