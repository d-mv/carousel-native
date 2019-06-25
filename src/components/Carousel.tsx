import React from "react";
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  ImageSourcePropType,
  ScrollView
} from "react-native";

const imageComp = (arg0: any, arg1: any) => (
  <View style={styles.container}>
    <Image source={arg0.image.source} style={styles.image} />
  </View>
);

export interface CarouselPhoto {
  source: ImageSourcePropType;
}
export interface CarouselProps {
  photos: CarouselPhoto[];
}

export const Carousel = (props: CarouselProps) => {
  const [photo, setPhoto] = React.useState(0);
  const [prevPosition, setPrevPosition] = React.useState(0);
  const length = props.photos.length;

  const onChangeImage = (event: any) => {
    const result = event.nativeEvent.contentOffset.x > prevPosition;
    // check for non-fulfilled slidings
    if (result) {
      const next = photo + 1;
      const fake = next > length - 1;
      if (!fake) setPhoto(next);
    } else {
      const previous = photo - 1;
      const fake = previous < 0;
      if (!fake) setPhoto(previous);
    }

    setPrevPosition(event.nativeEvent.contentOffset.x);
  };

  const circle = (active?: boolean) => (
    <View
      key={Math.random().toString()}
      style={active ? [styles.circle, styles.current] : styles.circle}
    />
  );

  const slider = (
    <View style={styles.sliderContainer}>
      <View style={styles.slider}>
        {Object.keys(props.photos).map((el: any) =>
          circle(el === photo.toString())
        )}
      </View>
    </View>
  );

  const imageComponent = (source: ImageSourcePropType) => (
    <View key={Math.random()} style={styles.imageContainer}>
      <Image source={source} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        onMomentumScrollEnd={(event: any) => onChangeImage(event)}>
        {props.photos.map((photo: any) => imageComponent(photo.source))}
      </ScrollView>
      {slider}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 200
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get("window").width
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover",
    width: undefined,
    height: undefined
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    marginHorizontal: 10
  },
  current: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  sliderContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    bottom: 15
  },
  slider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
