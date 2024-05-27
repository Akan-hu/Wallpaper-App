import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { hp, wp } from '../../helpers/common'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { theme } from '../../constants/theme'
import { Octicons } from '@expo/vector-icons'
import Animated, { FadeInDown } from 'react-native-reanimated'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import Toast from 'react-native-toast-message'

const ImageScreen = () => {
  const router = useRouter()
  const [status, setStatus] = useState('loading')
  const [imageDownloaded, setImageDownloaded] = useState(false)
  const item = useLocalSearchParams()

  let uri = item?.webformatURL
  const fileName = item?.previewURL?.split('/').pop()
  const imageUrl = uri
  const filePath = `${FileSystem.documentDirectory}${fileName}`

  const getImageSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight
    const maxWidth = Platform.OS === 'web' ? wp(50) : wp(92)
    let calculateHeight = maxWidth / aspectRatio
    let calculateWidth = maxWidth

    if (aspectRatio < 1) {
      //it means image in portrait style
      calculateWidth = calculateHeight * aspectRatio
    }

    return {
      width: calculateWidth,
      height: calculateHeight,
    }
  }
  const onLoad = () => {
    setStatus('')
  }

  const downloadImage = async () => {
    setStatus('downloading')
    if (Platform.OS === 'web') {
      const anchor = document.createElement('a')
      anchor.href = imageUrl
      anchor.target = '_blank'
      anchor.download = fileName || 'download'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    } else {
      let uri = await downLoadFile()
      setImageDownloaded(true)
      if (uri) showToast('Image downloaded successfully')
    }
  }

  const shareImage = async () => {
    setStatus('sharing')
    let uri = await downLoadFile()
    if (uri) {
      //share image
      await Sharing.shareAsync(uri)
    }
  }

  const downLoadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath)
      setStatus('')
      return uri
    } catch (e) {
      console.log(e)
      Alert.alert(e?.message)
      setStatus('')
      return null
    }
  }

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
    })
  }

  const toastConfig = {
    success: ({ text1, props, ...rest }) => {
      return (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{text1}</Text>
        </View>
      )
    },
  }
  return (
    <BlurView tint="dark" intensity={60} style={styles.container}>
      <View style={[getImageSize()]}>
        <View style={styles.loading}>
          {status == 'loading' && (
            <ActivityIndicator size={'large'} color={theme.colors.white} />
          )}
        </View>
        <Image
          source={uri}
          style={[styles.image, getImageSize()]}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.press} onPress={() => router?.back()}>
            <Octicons name="x" size={24} color={'white'} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status == 'downloading' ? (
            <View style={styles.press}>
              <ActivityIndicator size={'small'} color={theme.colors.white} />
            </View>
          ) : (
            <Pressable style={styles.press} onPress={downloadImage}>
              {imageDownloaded ? (
                <Octicons name="check" size={24} color={'white'} />
              ) : (
                <Octicons name="download" size={24} color={'white'} />
              )}
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status == 'sharing' ? (
            <View style={styles.press}>
              <ActivityIndicator size={'small'} color={theme.colors.white} />
            </View>
          ) : (
            <Pressable style={styles.press} onPress={shareImage}>
              <Octicons name="share" size={22} color={'white'} />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={toastConfig} />
    </BlurView>
  )
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  loading: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: wp(4),
  },
  press: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    borderCurve: 'continuous',
  },
  downloading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  toast: {
    padding: 15,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
})
export default ImageScreen
