/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { COLORS, SPACING } from '../Themes/theme.ts'
import { upcomingMovies, popularMovies, nowPlayingMovies, imageUrl } from './src/api/apicalls';
import InputHeader from '../components/InputHeader.tsx';

const { width, height } = Dimensions.get('window')

const HomeScreen = () => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  if (nowPlayingMoviesList == undefined && popularMoviesList == undefined && upcomingMoviesList == undefined
    && nowPlayingMoviesList == null && popularMoviesList == null && upcomingMoviesList == null) {
    return (
      <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.inputHeaderContainer}>
          <InputHeader text={"Search Your Movies Here"} />
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <InputHeader />
        </View>
      </TouchableOpacity>
    </View >
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1
  },
  searchText: {
    color: COLORS.WhiteRGBA32,
    fontSize: 14
  },
  searchBarContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  searchBar: {
    paddingVertical: SPACING.space_10 * 1.5,
    paddingHorizontal: SPACING.space_20,
    width: width - 30,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 19.5,
    alignItems: "center",
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  }
});

export default HomeScreen;