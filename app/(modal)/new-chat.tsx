import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AlphabetList } from 'react-native-section-alphabet-list';
import contacts from '@/assets/data/contacts.json';
import Colors from '@/constants/Colors';
const NewChatPage = () => {
  const data = contacts.map((contact, index) => {
    return {
      value: `${contact.first_name} ${contact.last_name}`,
      name: `${contact.first_name} ${contact.last_name}`,
      img: contact.img,
      desc: contact.desc,
      key: `${contact.first_name} ${contact.last_name}-${index}`,
    };
  });
  return (
    <View
      style={{ paddingTop: 110, backgroundColor: Colors.background, flex: 1 }}
    >
      <AlphabetList
        data={data}
        indexLetterStyle={{
          color: Colors.primary,
          fontSize: 12,
        }}
        indexContainerStyle={{
          width: 24,
          backgroundColor: Colors.background,
        }}
        style={{
          marginLeft: 14,
          flex: 1,
        }}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderCustomItem={(item: any) => (
          <View style={styles.listItemContainer}>
            <Image source={{ uri: item.img }} style={styles.img} />
            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                {item.value}
              </Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {item.desc.length > 40
                  ? `${item.desc.slice(0, 40)}...`
                  : item.desc}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default NewChatPage;

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: 'white',
  },
});
