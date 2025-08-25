import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { fetchData } from "../api/api";

const { width } = Dimensions.get("window");

export default function VideosScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarVideos = async () => {
      const data = await fetchData("videos");
      if (Array.isArray(data)) {
        setVideos(data);
      }
      setLoading(false);
    };
    cargarVideos();
  }, []);

  const getYouTubeId = (url) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const videoId = getYouTubeId(item.url);
          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.titulo}</Text>
              {videoId && (
                <YoutubePlayer
                  height={220}
                  width={width - 40}
                  play={false}
                  videoId={videoId}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 10,
  },
});
