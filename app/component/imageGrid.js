import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import ImageCard from './imageCard'
import { wp } from '../../helpers/common'
const ImageGrid = ({ data }) => {
  return (
    <View style={style.container}>
      <MasonryFlashList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.contentContainer}
        numColumns={2}
        initialNumToRender={1000}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} />
        )}
        estimatedItemSize={200}
      />
    </View>
  )
}
const style = StyleSheet.create({
  container: { minHeight: 3, width: wp(100) },
  contentContainer: { paddingHorizontal: wp(4) },
})
export default ImageGrid
