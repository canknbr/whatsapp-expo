import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  
  useEffect(() => {
    if (!isLoaded) return;
    const inTabsGroup = segments[0] === '(tabs)';
    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)/chats');
    }else if(!isSignedIn){
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <View />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)/new-chat" options={{ presentation:'modal',
        title:'New Chat',
        headerTransparent:true,
        headerBlurEffect:'regular',
        headerStyle:{
          backgroundColor:Colors.background
        },
        headerSearchBarOptions:{
          hideWhenScrolling:false,
          placeholder:'Search  name or number'
        },
        headerRight:()=>{
          return <Link asChild href={'/(tabs)/chat'}>
            <TouchableOpacity style={{backgroundColor:Colors.lightGray,borderRadius:20,padding:4}}>
              <Ionicons name='close' color={Colors.gray} size={30}/>
            </TouchableOpacity>
          </Link>
        }
       }} />
      <Stack.Screen
        name="otp"
        options={{
          headerTitle: 'Enter Your Phone Number',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: 'Verify Your Phone Number',
          headerBackTitle: 'Edit Number',
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav