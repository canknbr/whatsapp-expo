import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
export interface IChatRowProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}
const ChatRow: FC<IChatRowProps> = ({
  id,
  from,
  date,
  msg,
  img,
  read,
  unreadCount,
}) => {
  return (
    <AppleStyleSwipeableRow>
    <Link href={'/(tabs)/chats'} asChild>
      <TouchableHighlight activeOpacity={0.9} underlayColor={Colors.lightGray}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
            paddingLeft: 12,
            paddingVertical: 10,
          }}
        >
          <Image source={{ uri: img }} style={styles.img} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{from}</Text>
            <Text
              style={{ color: Colors.gray, fontSize: 14 }}
             
            >
              {msg.length > 40 ? `${msg.slice(0, 40)}...` : msg}
            </Text>
          </View>
          <Text style={{alignSelf:'flex-start',color:Colors.gray,paddingRight:16}}>
            {format(date,'MM.dd.yy')}
          </Text>
        </View>
      </TouchableHighlight>
    </Link>
    </AppleStyleSwipeableRow>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
