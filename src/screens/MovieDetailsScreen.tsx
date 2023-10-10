/* eslint-disable prettier/prettier */
import React, { useEffect, useState, Component, useRef } from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity, ScrollView, Image, Dimensions, ActivityIndicator, FlatList, Animated } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, BORDERRADIUS, FONTSIZE, FONTFAMILY } from '../Themes/theme'
import { imageUrl } from '../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import { MovieDetails } from '../api/apicalls';



const { width, height } = Dimensions.get("window");



const MovieDetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [movieDetails, setMovieDetails] = useState<any>(undefined);
    const [backdropLoad, setBackdropLoad] = useState(false);
    const [posterLoad, setPosterLoad] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const backdropAnim = useRef(new Animated.Value(1)).current;



    useEffect(() => {

        fetchMovieDetails()

    }, [])

    const fetchMovieDetails = async () => {
        try {
            let response = await fetch(MovieDetails(item.id));
            let json = await response.json();
            setMovieDetails(json);
        } catch (error) {
            console.error("Error while fetching movie details", error);
        }
    }


    if (movieDetails == undefined) {
        return (<View style={{ flex: 1, height: height, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.Black }}>
            <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>)

    }

    console.log(MovieDetails(item.id), imageUrl(`w${Math.floor(width / 100) * 100}`, item.backdrop_path))

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
        }).start();
        setPosterLoad(true);
    };

    const backdropFadeOut = () => {
        Animated.timing(backdropAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
        }).start();
        setBackdropLoad(true);
    }
    const getMonth = (month: string) => {
        if (month == "01") {
            return "January";
        }
        if (month == "02") {
            return "February";
        }
        if (month == "03") {
            return "March";
        }
        if (month == "04") {
            return "April";
        }
        if (month == "05") {
            return "May";
        }
        if (month == "06") {
            return "June";
        }
        if (month == "07") {
            return "July";
        }
        if (month == "08") {
            return "August";
        }
        if (month == "09") {
            return "September";
        }
        if (month == "10") {
            return "October";
        }
        if (month == "11") {
            return "November";
        }
        if (month == "01") {
            return "December";
        }
    }

    return (
        <ScrollView style={styles.container}>

            {/* Backdrop Image */}

            <View style={{ flex: 1, height: 200 }}>
                <Image style={styles.backdrop_image}
                    source={{ uri: imageUrl(`original`, item.backdrop_path) }}
                    onLoad={backdropFadeOut}
                    blurRadius={backdropLoad ? 0 : 5}
                />

                <LinearGradient
                    // Button Linear Gradient
                    colors={['rgba(0,0,0,0)', COLORS.Black]}
                    style={styles.linearGradient} />
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <CustomIcon name="close" color={COLORS.White} size={24} />
                </TouchableOpacity>
            </View>
            <Animated.View style={{ flex: 1, height: 200, marginTop: -200, opacity: backdropAnim }}>
                <Image style={styles.backdrop_image}
                    source={{ uri: imageUrl(`w300`, item.backdrop_path) }}
                />

                <LinearGradient
                    // Button Linear Gradient
                    colors={['rgba(0,0,0,0)', COLORS.Black]}
                    style={styles.linearGradient} />
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <CustomIcon name="close" color={COLORS.White} size={24} />
                </TouchableOpacity>
            </Animated.View>

            {/* Poster Image */}

            <View style={styles.profileContainer}>
                <Image style={styles.profile} progressiveRenderingEnable={true}
                    source={{ uri: imageUrl("w500", item.poster_path) }}
                    onLoad={fadeOut}
                    blurRadius={posterLoad ? 0 : 5}
                />
            </View>

            <Animated.View style={[styles.profileUntilLoadContainer, {
                opacity: fadeAnim
            }]}>
                <Image style={styles.profileUntilLoad}
                    source={{ uri: imageUrl("w185", item.poster_path) }}
                    blurRadius={posterLoad ? 0 : 5}
                />

            </Animated.View>

            {/* Movie Duration Details */}

            <View style={styles.durationContainer}>
                <CustomIcon name="clock" size={FONTSIZE.size_14} color={COLORS.WhiteRGBA32} />
                <Text style={styles.durationText}>2h50m</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{movieDetails.original_title}</Text>
            </View>


            <View style={{ flexDirection: "row", justifyContent: "center", paddingHorizontal: 10 }}>
                {movieDetails.genres.map((item, index) => {
                    return (
                        <View key={index} style={styles.genreBox}><Text style={styles.genreText}>{item.name}</Text></View>
                    )
                })}
            </View>

            <View style={styles.taglineContainer}>
                <Text style={styles.taglineText}>{movieDetails.tagline}</Text>
            </View>

            <View style={styles.ratingsContainer}>
                <CustomIcon name="star" size={FONTSIZE.size_20} color={COLORS.Yellow} />
                <Text style={styles.ratingText}>{item.vote_average}</Text>
                <Text style={[styles.ratingText, { marginLeft: 5 }]}>({item.vote_count})</Text>
                <Text style={styles.ratingText}>
                    {`${item.release_date.slice(0, 4)} ${getMonth(item.release_date.slice(5, 7))} ${item.release_date.slice(8, 10)}`}
                </Text>
            </View>
            <View style={styles.overviewContainer}>
                <Text style={styles.overviewText}>{item.overview}</Text>
            </View>
            <View><Text style={styles.castHeader}>Top Cast</Text></View>

        </ScrollView >
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Black
    },
    closeButton: {
        position: "absolute",
        backgroundColor: COLORS.Orange,
        width: 34,
        height: 34,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 28,
        borderRadius: BORDERRADIUS.radius_25,
        zIndex: 3
    },
    backdrop_image: {
        width: width,
        height: 200
    },
    profileContainer: {
        alignSelf: "center",
        marginTop: -100,
        height: 353,
        flex: 1,
        zIndex: 3

    },
    profile: {
        width: 236,
        height: 353,
    },
    linearGradient: {
        flex: 1,
        zIndex: 2,
        marginTop: -200
    },
    durationContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    durationText: {
        color: "white",
        fontFamily: FONTFAMILY.poppins_regular,
        marginLeft: 5
    },
    titleContainer: {
        flex: 1,
        alignItems: "center",
    },
    titleText: {
        color: "white",
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_24,

    },
    genreBox: {
        borderWidth: 1,
        borderColor: COLORS.WhiteRGBA32,
        padding: 6,
        borderRadius: 10,
        marginHorizontal: 10
    },
    profileUntilLoadContainer: {
        alignSelf: "center",
        marginTop: -353,
        height: 353,
        flex: 1,
        zIndex: 4
    },
    profileUntilLoad: {
        width: 236,
        height: 353,
    },
    genreText: {
        color: COLORS.WhiteRGBA75,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10
    },
    ratingsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20
    },
    ratingText: {
        color: COLORS.White,
        marginLeft: 5
    },
    taglineContainer: {
        alignItems: "center",
        marginTop: 5
    },
    taglineText: {
        color: COLORS.White,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        fontStyle: "italic"
    },
    overviewContainer: {
        padding: 10
    },
    overviewText: {
        color: COLORS.White,
        fontFamily: FONTFAMILY.poppins_regular,
    },
    castHeader: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_bold,
        marginLeft: 10
    }

});

export default MovieDetailsScreen;