/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, StatusBar, FlatList } from 'react-native';
import { COLORS, SPACING } from '../Themes/theme.ts'
import { upcomingMovies, popularMovies, nowPlayingMovies, imageUrl } from '../api/apicalls.ts';
import InputHeader from '../components/InputHeader.tsx';
import CategoryHeader from '../components/CategoryHeader.tsx';

const { width, height } = Dimensions.get('window')

const getNowPlayingMovies = async () => {
  try {
    let data = await fetch(nowPlayingMovies);
    let jsonResponse = await data.json();
    return jsonResponse;
  } catch (error) {
    console.error("Something went wrong while fetching popular movies list", error)
  }
}

const getPopularMovies = async () => {
  try {
    let data = await fetch(popularMovies);
    let jsonResponse = await data.json();
    return jsonResponse;
  } catch (error) {
    console.error("Something went wrong while fetching popular movies list", error)
  }
}

const getUpcomingMovies = async () => {
  try {
    let data = await fetch(upcomingMovies);
    let jsonResponse = data.json();
    return jsonResponse;
  } catch (error) {
    console.error("Something went wrong while fetching upcoming movies list", error)
  }
}

const HomeScreen = ({ navigation }: any) => {


  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMovies();
      setNowPlayingMoviesList({ ...tempNowPlaying });
      let tempPopular = await getPopularMovies();
      setPopularMoviesList({ ...tempPopular });
      let tempUpcoming = await getUpcomingMovies();
      setUpcomingMoviesList({ ...tempUpcoming });
    })();
  }, [])


  const searchMoviesFunction = () => {
    navigation.navigate("Search")
  }

  if (nowPlayingMoviesList == undefined && popularMoviesList == undefined && upcomingMoviesList == undefined
    && nowPlayingMoviesList == null && popularMoviesList == null && upcomingMoviesList == null) {
    return (
      <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.inputHeaderContainer}>
          <InputHeader text={"Search Your Movies Here"} searchFunction={searchMoviesFunction} />
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader text={"Search Your Movies Here"} searchFunction={searchMoviesFunction} />
      </View>
      <CategoryHeader title={"Now Playing"} />

    </ScrollView>
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