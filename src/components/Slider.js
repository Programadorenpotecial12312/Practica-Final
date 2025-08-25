import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    image: require("../../assets/slider1.jpg"),
    text: "Protejamos nuestros bosques 🌳",
  },
  {
    id: 2,
    image: require("../../assets/slider2.jpeg"),
    text: "Cuidemos nuestras playas 🏖️",
  },
  {
    id: 3,
    image: require("../../assets/slider3.jpeg"),
    text: "El futuro depende de nosotros 🌍",
  },
];

export default function Slider() {
  return (
    <Swiper autoplay showsPagination={true} dotColor="#ccc" activeDotColor="#2e7d32">
      {slides.map((item) => (
        <View key={item.id} style={styles.slide}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: width,
    height: height * 0.6,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2e7d32",
  },
});
