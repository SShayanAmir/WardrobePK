import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';

const images = [
  "https://scontent.flhe23-1.fna.fbcdn.net/v/t1.18169-9/19665315_10155522379591803_5454326341617704842_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG4aKFTw3oZibmiJEiwhF_PsoOd17DLtzKyg53XsMu3MvyKkI4QbqMEeBZkQajWjb5MxGkFfofBVW0Btm7zOu2N&_nc_ohc=ele5jLZEXMkAX88KDUk&_nc_oc=AQl1blsqD7YhVZK5304c4ehyWwDRTtknPWOvLkSXZMnJNe_IXGH6lvS_FW4QJ2sr4AA&_nc_ht=scontent.flhe23-1.fna&oh=00_AfAGYNCXoTTXmSxqrA_0Rp2GoPrNQTA4L3DB7U2AbuwXBQ&oe=63F8EA4E",
  'https://scontent.flhe23-1.fna.fbcdn.net/v/t1.6435-9/117803196_10158903569932577_1720628910233082397_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFk2KpyR-LYqTB6DA184JohXZIVJsXJoeZdkhUmxcmh5sF9MIDsyjMD1pU_5GATwGCNsSRVdzsXCpoWbJW0nLAM&_nc_ohc=sTspfEHzAV0AX95FdGu&_nc_ht=scontent.flhe23-1.fna&oh=00_AfD-bI6HGh3VBbgaOVCoWRCN3Ljw7Wxu4hb_qwRnSSQyGw&oe=63F8EF25',
  "https://scontent.flhe23-1.fna.fbcdn.net/v/t39.30808-6/313422153_10159339898259075_3505294250375769044_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHCESh4la0p_NwPUdryFBZG6TeuM1ydPs7pN64zXJ0-zh7fsPaY8fy1SumqiuhNOH2bWUOFMFOz0WvqqaWSllzM&_nc_ohc=ZF2FoeuAF1EAX9UhHqY&_nc_ht=scontent.flhe23-1.fna&oh=00_AfD6rHdQn3yTwBmTO73dAA59irM5oFSXkyuMmytNYpvmjQ&oe=63D6475A",
  "https://scontent.flhe23-1.fna.fbcdn.net/v/t39.30808-6/327447125_1337763816766786_7150423209617308824_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHid6uViz092dFHlBufCdCkh1mNpjFGkX2HWY2mMUaRfU4IfZOxmzSf1hQPk7PazPY6BCUv2-5ulwh2vTDzBh9S&_nc_ohc=cPtzf4TvtikAX-D32Ap&_nc_ht=scontent.flhe23-1.fna&oh=00_AfCqdlOYBUcCXL2hIkYpzg6208OAd2zBONBpaCwdz8FQIQ&oe=63D5C608",
  'https://scontent.flhe23-1.fna.fbcdn.net/v/t1.6435-9/31206429_1985538004811974_2044696305988534272_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGibBGH9KIRBKsFsWkZrHdtD45qbbkkJ7sPjmptuSQnuzDR0SIOKd-KJPr_JZ1dDZq-RGZtzz5AAIdRIJkWsvHZ&_nc_ohc=2N2kPmogmG4AX9dlwNI&_nc_ht=scontent.flhe23-1.fna&oh=00_AfBjPLgbcOJDObof_fxlC41qYw39B8NhqNf6D-auQcgt9w&oe=63F8CB24',
  "https://scontent.flhe23-1.fna.fbcdn.net/v/t1.6435-9/50299106_2178400535553641_6007680518546522112_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFTWinxnP1YgLJ-U3muHw7SgU2N_oGOSNSBTY3-gY5I1Cf06-NdAuGNlT0eZEG_wF7uJvQWXYRrPjs6O6JYdA5R&_nc_ohc=M4sn7grxNVEAX-WKgiM&_nc_ht=scontent.flhe23-1.fna&oh=00_AfC7mfZML71HwociiTpyW_1MMq28Gk8iMeQPPOlWfO1SPA&oe=63F8E7B4",
];

const {width} = Dimensions.get('window');
const height = width * 0.6; // 60%

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
            <Image key={idx} source={{uri: image}} resizeMode='cover' style={style.image} />
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
  paginngActiveText: {fontSize: width / 30, color: 'orange', margin: 3},
});
