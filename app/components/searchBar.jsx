import { Image, StyleSheet, TextInput, View } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image 
          source={require('../../assets/icons/search.png')}
          style={styles.icon}
        />
        <TextInput
          onPress={() => {}}
          style={styles.input}
          placeholder="Confirm your partners?"
          placeholderTextColor="#666"
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    marginTop: 20,
    paddingHorizontal: 5, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dfe1e5',
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical: 6,
    minWidth: 300,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#666',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  greetings: {
  fontSize: 22,
  fontWeight: '600',
  color: '#333',
  textAlign: 'center',
  marginBottom: 15,
}

});

export default SearchBar;