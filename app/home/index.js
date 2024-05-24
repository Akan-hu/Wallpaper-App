import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Categories from '../component/categories'
import { apiCall } from '../api'
import ImageGrid from '../component/imageGrid'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { debounce } from 'lodash'
let PAGE = 1
const Home = () => {
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef()
  const [activeCategory, setActiveCategory] = useState(null)
  const [data, setData] = useState([])
  const handleChangeCategory = (title) => {
    setActiveCategory(title)
  }

  useEffect(() => {
    fetchImages()
  }, [])
  const fetchImages = async (params = { page: 1 }, append = false) => {
    let res = await apiCall(params)

    if (res.success == true && res?.data?.hits) {
      if (append) {
        {
          /**   add the new data to the existing data.
        This uses the spread operator (...) to create a new array that combines the existing data array with the new data from res.data.hits. 
        */
        }
        setData([...data, ...res?.data?.hits])
      } else {
        //replace the existing data with the new data.
        setData([...res?.data?.hits])
      }
    }
  }

  const handleSearch = (text) => {
    setSearchText(text)
    if (text.length > 2) {
      console.log('54')
      //search for this text
      PAGE = 1
      setData([])
      fetchImages({ PAGE, q: text })
    }
    console.log(text)
    if (text == '') {
      inputRef?.current?.clear()
      setSearchText('')
      console.log('60')
      //reset results
      PAGE = 1
      setData([])
      fetchImages({ PAGE })
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), [])

  const { top } = useSafeAreaInsets()
  const paddingTop = top > 0 ? top + 10 : 30
  return (
    <View style={{ flex: 1, paddingTop: paddingTop }}>
      {/* <StatusBar style="light" /> */}
      {/** Header */}
      <View style={style.headerContainer}>
        <Text style={style.pixel}>Find Wallpapers</Text>
        <Pressable>
          <FontAwesome6 name="bars-staggered" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView>
        <View style={style.searchContainer}>
          <View style={style.inputContainer}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            style={style.input}
            onChangeText={handleTextDebounce}
            ref={inputRef}
          />
          {searchText && (
            <Pressable
              style={style.crossIcon}
              onPress={() => {
                // setSearchText('')
                handleSearch('')
              }}
            >
              <Ionicons
                name="close"
                size={22}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
        <View>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {/** images masonry grid */}
        <View style={{ marginTop: 15 }}>
          {data.length > 0 && <ImageGrid data={data} />}
        </View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  pixel: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.neutral(0.9),
    fontSize: hp(3.5),
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    padding: 7,
    paddingLeft: 10,
    marginTop: 18,
    borderRadius: theme.radius.lg,
  },
  inputContainer: { padding: 7 },
  input: { flex: 1, paddingHorizontal: 2 },
  crossIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    borderRadius: theme.radius.sm,
    padding: 5,
  },
})
export default Home
