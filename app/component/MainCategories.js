import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { PRIMARY_COLOR, theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'

const MainCategories = ({ activeTab, activeMainCategory }) => {
  const data = ['Wallpapers', 'Videos']
  return (
    <View style={style.container}>
      {data?.map((item, index) => {
        let isActive = activeTab == item
        return (
          <Animated.View
            key={index}
            entering={FadeInRight.delay(index * 200)
              .duration(1000)
              .springify()
              .damping(14)}
          >
            <Pressable
              style={style.category(isActive)}
              onPress={() => activeMainCategory(item)}
            >
              <Text style={style.title(isActive)}>{item}</Text>
            </Pressable>
          </Animated.View>
        )
      })}
    </View>
  )
}

const style = StyleSheet.create({
  container: { paddingHorizontal: wp(4), gap: 10, flexDirection: 'row' },
  category: (isActive) => ({
    paddingHorizontal: 15,
    backgroundColor: isActive ? PRIMARY_COLOR : theme.colors.white,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  }),
  title: (isActive) => ({
    fontSize: hp(1.7),
    fontWeight: theme.fontWeight.semibold,
    color: isActive ? theme.colors.white : theme.colors.neutral(0.8),
  }),
})
export default MainCategories
