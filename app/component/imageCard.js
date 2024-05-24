import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
const ImageCard = (props) => {
  const { item, index } = props
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item
    return { height: getImageSize(height, width) }
  }
  const isLastInRow = (index + 1) % 2 == 0

  return (
    <Pressable style={style.container(isLastInRow)}>
      <Image
        style={[style.image, getImageHeight()]}
        source={{ uri: item?.webformatURL }}
        // placeholder={{ blurhash }}
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
