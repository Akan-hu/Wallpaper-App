import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { categories } from '../../constants/data'
import { capatalizeFirstChar, hp, wp } from '../../helpers/common'
import { PRIMARY_COLOR, theme } from '../../constants/theme'
import Animated, { FadeInRight } from 'react-native-reanimated'

const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList
      horizontal={true}
      data={categories}
      contentContainerStyle={style.container}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <Category
          item={item}
          index={index}
          isActive={activeCategory == item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  )
}
const Category = ({ item, index, isActive, handleChangeCategory }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        style={style.category(isActive)}
        onPress={() => handleChangeCategory(isActive ? null : item)}
      >
        <Text style={style.title(isActive)}>{capatalizeFirstChar(item)}</Text>
      </Pressable>
    </Animated.View>
  )
}
const style = StyleSheet.create({
  container: { paddingHorizontal: wp(4), gap: 10 },
  category: (isActive) => ({
    paddingHorizontal: 15,
    backgroundColor: isActive ? '#f3e9fc' : theme.colors.white,
    padding: 12,
    borderWidth: 0.5,
    borderColor: isActive ? PRIMARY_COLOR : theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  }),
  title: (isActive) => ({
    fontSize: hp(1.7),
    fontWeight: theme.fontWeight.medium,
    color: isActive ? PRIMARY_COLOR : theme.colors.neutral(0.9),
  }),
})
export default Categories
