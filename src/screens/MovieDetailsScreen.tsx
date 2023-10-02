/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, BORDERRADIUS, FONTSIZE, FONTFAMILY } from '../Themes/theme'
import { imageUrl } from '../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");

const MovieDetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;
    console.log(item, imageUrl("w200", item.poster_path))
    return (
        <ScrollView style={styles.container}>




            <View style={{ flex: 1, height: 200 }}>
                <Image style={styles.backdrop_image} source={{ uri: imageUrl(`w${Math.floor(width / 100) * 100}`, item.backdrop_path) }} />
                <LinearGradient
                    // Button Linear Gradient
                    colors={['rgba(0,0,0,0)', COLORS.Black]}
                    style={styles.linearGradient} />
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <CustomIcon name="close" color={COLORS.White} size={24} />
                </TouchableOpacity>
            </View>


            <View style={styles.profileContainer}>
                <Image style={styles.profile} source={{ uri: imageUrl("w200", item.poster_path) }} />
            </View>

            <View style={styles.durationContainer}>
                <CustomIcon name="clock" size={FONTSIZE.size_14} color={COLORS.WhiteRGBA32} />
                <Text style={styles.durationText}>2h50m</Text>
            </View>




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
    }

});

export default MovieDetailsScreen;