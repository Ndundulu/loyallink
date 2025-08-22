import React from 'react';
import { Image, StyleSheet, TextInput, View, Dimensions } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image 
          source={require('../../assets/icons/search.png')} // Adjust path
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your partner?"
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Keep full width
    marginTop: 20,
    paddingHorizontal: 5, // Reduced padding to maximize width
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dfe1e5',
    borderRadius: 24,
    paddingHorizontal: 15, // Increased padding for internal space
    paddingVertical: 6,
    minWidth: 300, // Increased minimum width to make it wider
    // Optional: Use a percentage of screen width
    // maxWidth: '90%', // Limit to 90% of screen if needed
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#666',
    marginRight: 10, // Adjusted for wider input
  },
  input: {
    flex: 1, // Ensure input expands
    height: 40,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
});

export default SearchBar;