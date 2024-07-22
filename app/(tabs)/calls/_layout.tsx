import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const CallLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Calls',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Ionicons name='call-outline' size={24} color={Colors.primary} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
};

export default CallLayout;
