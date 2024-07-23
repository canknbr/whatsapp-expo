import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import calls from '@/assets/data/calls.json';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { SegmentedControl } from '@/components/SegmentedControl';
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SwipeableRow from '@/components/SwipeableRow';
import * as Haptics from 'expo-haptics';

const transition = CurvedTransition.delay(100);
const AnimatedTouchableButton =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const [isEditing, setEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');
  const [data, setData] = useState(calls);
  const editing = useSharedValue(-30);

  const onEdit = () => {
    let newEditing = !isEditing;
    editing.value = newEditing ? 0 : -30;
    setEditing(newEditing);
  };
  const animatedEditingButton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(editing.value),
        },
      ],
    };
  });
  useEffect(() => {
    if (selectedOption === 'All') {
      setData(calls);
    } else {
      setData(calls.filter((item) => item.missed));
    }
  }, [selectedOption]);

  const removeCall = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setData(data.filter((i) => i.id !== item.id));
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
          headerTitle: () => (
            <SegmentedControl
              options={['All', 'Missed']}
              selectedOption={selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList
            data={data}
            scrollEnabled={false}
            skipEnteringExitingAnimations
            itemLayoutAnimation={transition}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={({ item, index }) => (
              <SwipeableRow onDelete={() => removeCall(item)}>
                <Animated.View
                  entering={FadeInUp.delay(index * 12)}
                  exiting={FadeOutUp}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <AnimatedTouchableButton
                    onPress={() => removeCall(item)}
                    style={[animatedEditingButton,{paddingLeft:8}]}
                  >
                    <Ionicons
                      name="remove-circle"
                      size={24}
                      color={Colors.red}
                    />
                  </AnimatedTouchableButton>
                  <Animated.View style={[defaultStyles.item,animatedEditingButton]}>
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
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Text style={{ color: Colors.gray }}>
                        {format(item.date, 'MM.dd.yy')}
                      </Text>
                      <Ionicons
                        name="information-circle-outline"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                  </Animated.View>
                </Animated.View>
              </SwipeableRow>
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
          />
        </Animated.View>
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
