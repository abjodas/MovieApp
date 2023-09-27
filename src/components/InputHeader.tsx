/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDERRADIUS, FONTFAMILY, FONTSIZE } from '../Themes/theme'
import CustomIcon from './CustomIcon';


const InputHeader = (props: any) => {
  const [searchText, onChangeText] = useState<string>("");


  return (
    <View style={styles.inputBox}>
      <TextInput style={styles.textInput} placeholderTextColor={COLORS.WhiteRGBA32} value={searchText} placeholder={props.text} onChangeText={textInput => onChangeText(textInput)} />
      <TouchableOpacity onPress={() => props.searchFunction(searchText)}>
        <CustomIcon name="search" size={FONTSIZE.size_20} color={COLORS.Orange} />
      </TouchableOpacity>
    </View >
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    color: COLORS.White,
    width: "90%",
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14
  }
});
