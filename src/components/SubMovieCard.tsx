/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SPACING, FONTSIZE, BORDERRADIUS } from '../Themes/theme';


const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate("MovieDetails", { item: props.item })}>
      <Image style={styles.image} source={{ uri: props.posterPath }} />
    </TouchableOpacity >
  );
};

export default SubMovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: 133,
    height: 200
  }
});
