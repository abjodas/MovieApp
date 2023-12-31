/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, StatusBar, FlatList } from 'react-native';
import { COLORS, SPACING } from '../Themes/theme.ts'
import { upcomingMovies, popularMovies, nowPlayingMovies, imageUrl } from '../api/apicalls.ts';
import InputHeader from '../components/InputHeader.tsx';
import CategoryHeader from '../components/CategoryHeader.tsx';
import SubMovieCard from '../components/SubMovieCard.tsx';

const { width, height } = Dimensions.get('window')





const HomeScreen = ({ navigation }: any) => {


  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
  const [offset, setOffset] = useState(1);
  const [popMovieOffset, setPopMovieOffset] = useState(1);

  useEffect(() => {
    getNowPlayingMovies()
    getPopularMovies();
    getUpcomingMovies();
  }, [])

  const getNowPlayingMovies = async () => {
    try {
      if (nowPlayingMoviesList == undefined) {
        let data = await fetch(`${nowPlayingMovies}&page=${offset}`);
        let jsonResponse = await data.json();
        setNowPlayingMoviesList(jsonResponse.results)
        console.log(jsonResponse.results);
        setOffset(offset + 1);
      }
      else {
        let data = await fetch(`${nowPlayingMovies}&page=${offset}`);
        let jsonResponse = await data.json();
        setNowPlayingMoviesList([...nowPlayingMoviesList, ...jsonResponse.results])
        setOffset(offset + 1);
      }

    } catch (error) {
      console.error("Something went wrong while fetching popular movies list", error)
    }
  }

  const getPopularMovies = async () => {
    try {
      if (popularMoviesList == undefined) {
        let data = await fetch(popularMovies);
        let jsonResponse = await data.json();
        setPopularMoviesList(jsonResponse.results)
      }
      else {
        let data = await fetch(`${popularMovies}&page=${popMovieOffset + 1}`);
        let jsonResponse = await data.json();
        setPopMovieOffset(jsonResponse.page);
        setPopularMoviesList([...popularMoviesList, ...jsonResponse.results]);
      }

    } catch (error) {
      console.error("Something went wrong while fetching popular movies list", error)
    }
  }

  const getUpcomingMovies = async () => {
    try {
      let data = await fetch(upcomingMovies);
      let jsonResponse = await data.json();
      console.log(upcomingMovies);
      setUpcomingMoviesList(jsonResponse.results)
    } catch (error) {
      console.error("Something went wrong while fetching upcoming movies list", error)
    }
  }

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
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader text={"Search Your Movies Here"} searchFunction={searchMoviesFunction} />
      </View>


      <CategoryHeader title={"Now Playing"} />


      {nowPlayingMoviesList != undefined && nowPlayingMoviesList.length != 0 &&
        < FlatList
          data={nowPlayingMoviesList}
          horizontal={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <SubMovieCard posterPath={imageUrl("w185", item.poster_path)} navigation={navigation} item={item} />
          }}
          onEndReachedThreshold={1}
          onEndReached={getNowPlayingMovies}
        />}






      <CategoryHeader title={"Upcoming"} />
      {upcomingMoviesList != undefined && upcomingMoviesList.length != 0 &&
        < FlatList
          data={upcomingMoviesList}
          horizontal={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <SubMovieCard posterPath={imageUrl("w185", item.poster_path)} navigation={navigation} item={item} />
          }}

        />}

      <CategoryHeader title={"Popular"} />
      {popularMoviesList != undefined && popularMoviesList.length != 0 &&
        <View style={{ height: 200 }}>
          < FlatList
            data={popularMoviesList}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <SubMovieCard posterPath={imageUrl("w185", item.poster_path)} />
            }}
            onEndReachedThreshold={1}
            onEndReached={getPopularMovies}
          />

        </View>}



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