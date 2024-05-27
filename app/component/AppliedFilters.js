import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../../constants/theme'
import { capatalizeFirstChar, hp, wp } from '../../helpers/common'

const AppliedFilters = ({ filters, removeCurrentFilter }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {Object.keys(filters).map((key, index) => {
        const shouldShowColor = key == 'colors'
        return (
          <View style={styles.filterItem(shouldShowColor, filters[key])}>
            <Text style={styles.filterItemText}>
              {capatalizeFirstChar(filters[key])}
            </Text>
            <Pressable
              style={styles.filterCloseIcon}
              onPress={() => removeCurrentFilter(key)}
            >
              <Ionicons
                name="close"
                size={15}
                color={theme.colors.neutral(0.9)}
              />
            </Pressable>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginHorizontal: wp(4),
  },
  filterItem: (color, item) => ({
    padding: 3,
    backgroundColor: theme.colors.neutral(0.05),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    padding: color ? 6 : 8,
    gap: 10,
    borderWidth: color ? 2 : 0,
    borderColor: color ? item : null,
    marginHorizontal: 6,
    paddingHorizontal: 10,
  }),
  filterItemText: { fontSize: hp(1.7) },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 15,
  },
})
export default AppliedFilters
