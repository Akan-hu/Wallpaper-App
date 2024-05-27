import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
const ImageCard = (props) => {
  const { item, index, route } = props || {}

  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item
    return { height: getImageSize(height, width) }
  }
  const isLastInRow = (index + 1) % 2 == 0

  return (
    <Pressable
      style={style.container(isLastInRow)}
      onPress={() => route?.push({ pathname: 'home/image', params: item })}
    >
      <Image
        style={[style.image, getImageHeight()]}
        source={{ uri: item?.webformatURL }}
        transition={100}
      />
    </Pressable>
  )
}
const style = StyleSheet.create({
  container: (isLastInRow) => ({
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    marginBottom: wp(2),
    overflow: 'hidden',
    borderCurve: 'continuous',
    marginRight: !isLastInRow ? wp(2) : 0,
  }),
  image: { height: 300, width: '100%' },
})
export default ImageCard
