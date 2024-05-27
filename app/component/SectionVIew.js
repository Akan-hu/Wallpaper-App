import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { capatalizeFirstChar, capatalizeString, hp } from '../../helpers/common'
import { theme } from '../../constants/theme'

export const SectionVIew = (props) => {
  const { title, content } = props
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{capatalizeString(title)}</Text>
      <View>{content}</View>
    </View>
  )
}

export const OrderView = ({ data, filters, filterName, setFilters }) => {
  const onSelect = (item) => {
    setFilters({ ...filters, [filterName]: item })
  }
  return (
    <View style={styles.flexRowWrap}>
      {filterName != 'colors'
        ? data &&
          data.map((item, index) => {
            let active = filters && filters[filterName] == item

            return (
              <Pressable
                key={index}
                style={styles.outlineButton(active)}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.outlineButtonText(active)}>
                  {capatalizeFirstChar(item)}
                </Text>
              </Pressable>
            )
          })
        : data &&
          data.map((item, index) => {
            let active = filters && filters[filterName] == item

            return (
              <Pressable
                key={index}
                style={styles.colorFilter(item, active)}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.colorbg(item, active)}>
                  {capatalizeFirstChar(item)}
                </Text>
              </Pressable>
            )
          })}
    </View>
  )
}

const getBg = (item) => {
  if (
    item == 'green' ||
    item == 'blue' ||
    item == 'brown' ||
    item == 'black' ||
    item == 'gray' ||
    item == 'red'
  ) {
    return 'white'
  } else {
    return 'black'
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.neutral(0.8),
  },
  flexRowWrap: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  outlineButton: (active) => ({
    padding: 9,
    paddingHorizontal: 14,
    borderWidth: 1,

    backgroundColor: active ? theme.colors.neutral(0.8) : 'white',
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: 'continuous',
  }),
  outlineButtonText: (active) => ({
    color: active ? 'white' : theme.colors.neutral(0.8),
  }),
  colorFilter: (item, active) => ({
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 2,
    backgroundColor: item,
    borderColor: active ? theme.colors.neutral(0.6) : 'white',
    borderRadius: theme.radius.xs,
    borderCurve: 'continuous',
  }),
  colorbg: (item, active) => ({
    color: getBg(item, active),
  }),
})
