import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Video } from 'expo-av'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'

const VideoView = ({ videoData }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null)

  const handlePress = (videoId) => {
    setPlayingVideoId(playingVideoId === videoId ? null : videoId)
  }

  return (
    <View>
      {videoData.map((video, key) => {
        return (
          <View key={key} style={styles.videoContainer}>
            <Pressable
              onPress={() => handlePress(video.id)}
              style={styles.videoView}
            >
              <Video
                source={{ uri: video.videos.tiny.url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={playingVideoId === video.id}
                isLooping={true}
                style={styles.video}
              />
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  videoView: {
    marginHorizontal: 10,
    marginBottom: wp(2),
    overflow: 'hidden',
    alignItems: 'center',
    borderCurve: 'continuous',
  },
  video: {
    width: '96%',
    height: hp(52),
    borderRadius: theme.radius.xl,
    marginVertical: 8,
  },
  list: {},
  container: {
    flex: 1, // Ensure the parent view fills the available space
    padding: 10, // Add padding as needed
  },

  tags: {
    marginTop: 10,
  },
})
export default VideoView
