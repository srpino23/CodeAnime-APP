import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Video } from 'expo-av';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default function ViewScreen({ route, navigation, setMyValue }) {
  const { episode } = route.params;
  const isFocused = useIsFocused();
  const [isVisible, setIsVisible] = useState('flex');
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const visibleControls = () => {
    if (isVisible === 'flex') {
      setIsVisible('none');
    } else {
      setIsVisible('flex');
    }
  };

  const handlePlayPause = async () => {
    if (video.current) {
      if (isPlaying) {
        await video.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await video.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleForward = async () => {
    if (video.current) {
      const { positionMillis, durationMillis } =
        await video.current.getStatusAsync();
      const newPosition = positionMillis + 10000; // avanzar 10 segundos
      if (newPosition < durationMillis) {
        await video.current.setPositionAsync(newPosition);
      } else {
        await video.current.setPositionAsync(durationMillis);
      }
    }
  };

  const handleBackward = async () => {
    if (video.current) {
      const { positionMillis, durationMillis } =
        await video.current.getStatusAsync();
      const newPosition = positionMillis - 10000; // avanzar 10 segundos
      if (newPosition < durationMillis) {
        await video.current.setPositionAsync(newPosition);
      } else {
        await video.current.setPositionAsync(durationMillis);
      }
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setMyValue(true);
      lockAsync(OrientationLock.PORTRAIT);
    } else {
      setMyValue(false);
      lockAsync(OrientationLock.LANDSCAPE);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{ uri: episode.videoPath }}
        style={styles.video}
        resizeMode="contain"
      />
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => visibleControls()}
          style={styles.hideAndShowContainer}
        >
          <View
            style={{
              display: isVisible,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ padding: 10 }}
              >
                <Ionicons name="chevron-back" size={40} color="white" />
              </TouchableOpacity>
              <Text style={{ color: '#fff' }}>{episode.name}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '77%',
              }}
            >
              <TouchableOpacity onPress={handleBackward}>
                <Ionicons name="play-back" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlayPause}>
                {isPlaying ? (
                  <Ionicons name="md-pause" size={50} color="white" />
                ) : (
                  <Ionicons name="play" size={50} color="white" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForward}>
                <Ionicons name="play-forward" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  controls: {
    position: 'absolute',
  },
  hideAndShowContainer: {
    width: Height,
    height: Width,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});
