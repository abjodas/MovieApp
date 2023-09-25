/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.push("MovieDetails") }}>
        <Text>Home Screen</Text>
      </TouchableOpacity>
    </View >
  );
};



const styles = StyleSheet.create({
  container: {}
});

export default HomeScreen;