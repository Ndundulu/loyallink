import React from 'react';
import { Text, StyleSheet } from 'react-native';

const RevolvingHeartLink = () => {
  return (
    <Text style={styles.emoji}>
      💞🔗
    </Text>
  );
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 24, // Adjust size as needed
    textAlign: 'center',
  },
});

export default RevolvingHeartLink;