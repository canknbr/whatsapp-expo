import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// @ts-ignore
import welcomeImage from '@/assets/images/welcome.png';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
const MainPage = () => {
  const openLink = () => {
    Linking.openURL('https://example.com/privacy-policy');
  };

  return (
    <View style={styles.container}>
      <Image source={welcomeImage} style={styles.image} />
      <Text style={styles.headline}>Welcome to the App</Text>
      <Text style={styles.description}>
        Read Our{' '}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>{' '}
        · {'Tap "Aggree & Continue" to accept the '}{' '}
        <Text style={styles.link}>Terms of Service</Text>
      </Text>
      <Link href={'/otp'} asChild replace>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 80,
  },
  headline: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color:Colors.gray
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    backgroundColor:'#fff',
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
