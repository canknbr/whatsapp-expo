import {
  ActivityIndicator,
  Alert,
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
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

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
  const {signUp,setActive} = useSignUp()
  const {signIn} = useSignIn();
  const openLink = () => {
    Linking.openURL('https://example.com/privacy-policy');
  };
  const sendOTP = async () => {
    setLoading(true);
   try {
    await signUp!.create({
      phoneNumber
    })
    signUp!.preparePhoneNumberVerification();
    router.push(`verify/${phoneNumber}`)
   } catch (error) {
if(isClerkAPIResponseError(error)){
  if(error.errors[0].code === "form_identifier?exists"){
    console.log('user exist')
    await trySignIn()
  }else{
    setLoading(false)
    Alert.alert('error',error.errors[0].message)
  }
}
   }
  };
  const trySignIn = async () => {
    console.log('trySignIn', phoneNumber);

    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);
  };
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} style={{ flex: 1 }}>
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
