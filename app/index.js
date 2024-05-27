import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { PRIMARY_COLOR, theme } from '../constants/theme'
import { useRouter } from 'expo-router'

const index = () => {
  const router = useRouter()
  return (
    <View style={style.continer}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/welcome.png')}
        style={style.image}
        resizeMode="cover"
      />
      <Animated.View style={{ flex: 1 }} entering={FadeInDown.duration(600)}>
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.5)',
            'white',
            'white',
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          style={style.gradient}
        />
        <View style={style.contentContainer}>
          <Animated.Text
            style={style.pix}
            entering={FadeInDown.delay(400).springify()}
          >
            Pixel Pic
          </Animated.Text>
          <Animated.Text
            style={style.punchline}
            entering={FadeInDown.delay(500).springify()}
          >
            Beauty beyond the pixels.
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              style={style.exploreBtn}
              onPress={() => router.push('home')}
            >
              <Text style={style.start}>Explore now</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  )
}

const style = StyleSheet.create({
  continer: { flex: 1 },
  image: { height: hp(100), width: wp(100), position: 'absolute' },
  gradient: { width: wp(100), height: hp(60), bottom: 0, position: 'absolute' },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    gap: 14,
  },
  pix: {
    fontWeight: theme.fontWeight.bold,
    fontSize: hp(6),
    color: theme.colors.neutral(0.9),
  },
  punchline: {
    letterSpacing: 1,
    fontWeight: theme.fontWeight.medium,
  },
  exploreBtn: {
    backgroundColor: PRIMARY_COLOR,
    marginBottom: 50,
    padding: 15,
    paddingHorizontal: 60,
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl,
  },
  start: {
    color: theme.colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
    fontWeight: theme.fontWeight.bold,
  },
})
export default index
