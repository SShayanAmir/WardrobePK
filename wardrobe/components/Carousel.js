import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';

import { LazyLoadImage } from 'react-native-lazy-load-image';

const images = [
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Screenshot_20240203_022344_Samsung+Notes.jpg",
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Screenshot_20240203_021857_Samsung+Notes.jpg",
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Screenshot_20240203_022126_Samsung+Notes.jpg",
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Screenshot_20240203_021337_Samsung+Notes.jpg",
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/Screenshot_20240203_022628_WhatsApp.jpg",
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/3bb42ac50277d6a9da66cf9406787a44",
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/02ab2429e97932a72526466065585bd4",
  "https://wardrobe-pk.s3.ap-northeast-1.amazonaws.com/cbdfdc069cc708e42c4bb9211f9e87c4"
];

const {width} = Dimensions.get('window');
const height = width * 1.35; // 120%

export default class Carousel extends React.Component {
  state = {
    active: 0,
  };

  change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.active) {
      this.setState({active: slide});
    }
  };

  render() {
    return (
      <View style={style.container}>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={this.change}
          style={style.scroll}>
          {images.map((image, idx) => (
            <LazyLoadImage key={idx} source={{uri: image}} resizeMode='cover' style={style.image} />
          ))}
        </ScrollView>
        <View style={style.pagination}>
          {images.map((image, idx) => (
            <Text
              key={idx}
              style={
                idx == this.state.active
                  ? style.paginngActiveText
                  : style.paginationText
              }>
              ⬤
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width,
    height,
  },
  scroll: {width, height},
  image: {width, height},
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  paginationText: {fontSize: width / 30, color: '#888', margin: 3},
  paginngActiveText: {fontSize: width / 30, color: 'white', margin: 3},
});
