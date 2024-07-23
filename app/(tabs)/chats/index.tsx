import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import chats from '@/assets/data/chats.json';
import ChatRow from '@/components/ChatRow';
import { defaultStyles } from '@/constants/Styles';
const Page = () => {
  const [data, setData] = useState(chats);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40,backgroundColor:'white' }}
    >
      <FlatList
      scrollEnabled={false}
      keyExtractor={(item)=>item.id.toString()}
      ItemSeparatorComponent={()=><View style={[defaultStyles.separator,{marginLeft:90}]}/>}
       data={data} renderItem={({ item }) => <ChatRow {...item} />} />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
