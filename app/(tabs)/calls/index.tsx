import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import calls from '@/assets/data/calls.json';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const Page = () => {
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState(calls);
  const onEdit = () => {
    setEditing(!isEditing);
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={onEdit}>
                <Text style={{ color: Colors.primary }}>
                  {isEditing ? 'Edit' : 'Done'}
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{paddingBottom:40}}>
        <View style={defaultStyles.block}>
          <FlatList
            data={data}
            scrollEnabled={false}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={({ item }) => (
              <View style={[defaultStyles.item]}>
                <Image source={{ uri: item.img }} style={styles.avatar} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{
                      color: item.missed ? Colors.red : '#000',
                      fontSize: 18,
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Ionicons
                      name={item.video ? 'videocam' : 'call'}
                      size={16}
                      color={Colors.gray}
                    />
                    <Text style={{ flex: 1, color: Colors.gray }}>
                      {item.incoming ? 'Incoming' : 'Outgoing'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                >
                  <Text style={{color:Colors.gray}}>{format(item.date,'MM.dd.yy')}</Text>
                  <Ionicons name='information-circle-outline' size={24} color={Colors.primary}/>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
