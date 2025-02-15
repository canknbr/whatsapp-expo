import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

const SettingsLayout = () => {
  return <Stack>
    <Stack.Screen name='index' options={{
        headerTitle:"Settings",
        headerLargeTitle:true,
        headerShadowVisible:false,
        headerStyle:{
            backgroundColor:Colors.background,
        },
        headerSearchBarOptions:{
            placeholder:'Search'
        }
      
    }}/>
  </Stack>;
};

export default SettingsLayout;

const styles = StyleSheet.create({});
