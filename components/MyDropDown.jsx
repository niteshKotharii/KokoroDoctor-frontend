import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const MyDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('All Connections');
  const options = ['Master Class', 'Collaboration', 'ERP & CRM', 'E-commerce', 'Database', 'Analytics'];
  const dropdownRef = useRef<ModalDropdown | null>(null);

  const handleSelect = (index, value) => {
    setSelectedOption(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          if (dropdownRef.current) {
            dropdownRef.current.show();
          }
        }}
      >
        <Text style={styles.selectedText}>{selectedOption} 
          { selectedOption=='All Connections' && <Image source={require('../assets/Icons/DownArrow.png')}/>}</Text>
      </TouchableOpacity>
      <ModalDropdown
        ref={dropdownRef}
        options={options}
        defaultValue=""
        onSelect={handleSelect}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownList}
        dropdownTextStyle={styles.dropdownListText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdownButton: {
    backgroundColor: '#B8BAC24D',
    padding: 10,
    borderWidth: 1,
    borderColor: '#B8BAC24D',
    borderRadius: 5,
  },
  selectedText: {
    fontSize: 16,
    color: '#fff',
  },
  dropdown: {
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#fff',
  },
  dropdownList: {
    width: 200,
    borderWidth: 1,
    borderColor: '#B8BAC24D',
    borderRadius: 5,
  },
  dropdownListText: {
    fontSize: 16,
    padding: 10,
  },
});

export default MyDropdown;
