/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../Themes/theme';
import { searchCredits, imageUrl } from '../api/apicalls';



const CastCard = (props) => {

  const id = props.movieId;
  const [castData, setCastData] = useState<any>(undefined);


  useEffect(() => {
    searchCast();
  }, [])

  const searchCast = async () => {
    try {
      let response = await fetch(searchCredits(id));
      let json = await response.json();
      console.log(searchCredits(id));
      setCastData(json.cast);
    } catch (error) {
      console.error("Error while searching for credits", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Cast Card {id}</Text>
      {castData != undefined &&
        <FlatList
          data={castData}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <>
                <View style={{ alignItems: "center" }}>


                  <View style={styles.castImageContainer}>
                    <Image
                      style={styles.castImage}
                      source={{ uri: imageUrl("w185", item.profile_path) }}
                    />

                  </View>
                  <Text style={styles.castText}>{item.name}</Text>
                </View>
              </>
            )
          }}
        />
      }
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  castImageContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 23,
  },
  castImage: {
    width: 60,
    height: 80,
  },
  castText: {
    color: COLORS.White,
    fontSize: 9,
    fontFamily: FONTFAMILY.poppins_regular
  }
});
