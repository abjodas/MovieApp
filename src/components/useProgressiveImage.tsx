/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const useProgressiveImage = (lowQualitySrc, highQualitySrc) => {
    const [src, setSrc] = React.useState(lowQualitySRc);
    React.useEffect(() => {
        setSrc(lowQualitySrc);
        const img = new Image();
        img.source = highQualitySrc;
        img.onLoad = () => {
            setSrc(highQualitySrc);
        }
    }, [lowQualitySrc, highQualitySrc])

    return [src, { blur: src === highQualitySrc }]
};

export default useProgressiveImage;

