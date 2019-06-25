import React from 'react';
import { StyleSheet,View } from 'react-native';
import { Carousel } from './src/components/Carousel';

const photos = [
  {
    source: require("./src/assets/image__property_1.jpg")
  },
  {
    source: require("./src/assets/image__property_2.jpg")
  }
];


export default function App() {
  return (
    <View style={styles.container}>
      <Carousel photos={photos}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
