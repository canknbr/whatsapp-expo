import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const CallLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                color={Colors.primary}
                size={30}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <Link href="/(modal)/new-chat" asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="add-circle"
                    color={Colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
          // headerStyle: {
          //   backgroundColor: '#fff',
          // },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerBackTitleVisible: false,
          headerTitle: () => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  paddingBottom: 4,
                  width: 200,
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('@/assets/images/can.jpg')}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                  Can Kanbur
                </Text>
              </View>
            );
          },
          headerRight: () => (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}
            >
              <TouchableOpacity>
                <Ionicons
                  name="videocam-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="call-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  );
};

export default CallLayout;
