import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const data = [
  { key: 'Aggregation' },
  { key: 'Cache' },
  { key: 'Data Quality' },
  { key: 'Decryption' },
  { key: 'Drop' },
  { key: 'Select' }
];

export default function WebDropdown() {
  return (
    <View style={styles.webDropdownContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.webDropdownItem}>
            <Text style={styles.webDropdownText}>{item.key}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webDropdownContainer: {
    width: 500,
    height: 300,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#1F1B4D',
    overflow: 'hidden'
  },
  webDropdownItem: {
    padding: 15,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1
  },
  webDropdownText: {
    color: '#FFF',
    textAlign: 'center'
  }
});
