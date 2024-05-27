import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { theme } from '../../constants/theme'
import Categories from '../component/categories'
import { apiCall } from '../api'
import ImageGrid from '../component/imageGrid'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { debounce } from 'lodash'
import FiltersModal from '../component/filtersModal'
import AppliedFilters from '../component/AppliedFilters'
import { useRouter } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { style } from './homeStyles'
let page = 1
const Home = () => {
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef()
  const [activeCategory, setActiveCategory] = useState(null)
  const [data, setData] = useState([])
  const [filters, setFilters] = useState(null)
  const modalRef = useRef(null)
  const scrollRef = useRef(null)
  const [isEndReached, setIsEndReached] = useState(false)
  const route = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isShowing, setIsShowing] = useState(false)
  const [showScrollUp, setShowScrollUp] = useState(false)

  const handleChangeCategory = (title) => {
    clearSearch()
    setActiveCategory(title)
    let params = {
      page,
      ...filters,
    }
    if (title) {
      params.category = title
    }
    fetchImages(params, false)
  }

  useEffect(() => {
    fetchImages()
  }, [])
  const fetchImages = async (params = { page: 1 }, append = true) => {
    setIsLoading(true)
    let res = await apiCall(params)
    if (res.success && res?.data?.hits) {
      setIsLoading(false)
      if (append) {
        /**   add the new data to the existing data.
        This uses the spread operator (...) to create a new array that combines the existing data array with the new data from res.data.hits. 
        */

        setData([...data, ...res?.data?.hits])
      } else {
        //replace the existing data with the new data.
        setData([...res?.data?.hits])
      }
    }
  }

  const backAction = () => {
    if (isShowing) {
      modalRef.current?.close()
      setIsShowing(false)
      return true
    } else if (!isShowing) {
      route?.back()
      return true
    }
  }

  // Handle back button press to close the modal
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [backAction, isShowing])

  const clearSearch = () => {
    inputRef?.current?.clear()
    setSearchText('')
    setData([])
    page = 1
  }

  const handleSearch = (text) => {
    setSearchText(text)
    if (text.length > 2) {
      //search for this text
      setActiveCategory(null) //resetting category while searching
      page = 1
      setData([])
      fetchImages({ page, q: text, ...filters }, false)
    }

    if (text == '') {
      inputRef?.current?.clear()
      setSearchText('')
      setActiveCategory(null) //resetting category while searching
      //reset results
      page = 1
      setData([])
      fetchImages({ page, ...filters }, false)
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), [])

  const { top } = useSafeAreaInsets()
  const paddingTop = top > 0 ? top + 10 : 30

  const openModel = () => {
    modalRef?.current?.present()
    setIsShowing(true)
  }

  const closeModel = () => {
    modalRef?.current?.close()
    setIsShowing(false)
  }

  const applyFilter = () => {
    if (filters) {
      page = 1
      setData([])
      let params = {
        page,
        ...filters,
      }
      if (activeCategory) params.category = activeCategory
      if (searchText) params.q = searchText
      fetchImages(params, false)
    }
    closeModel()
  }
  const resetFilters = () => {
    handleScrollUp()
    if (filters) {
      page = 1
      setData([])
      setFilters(null)
      let params = {
        page,
      }
      if (activeCategory) params.category = activeCategory
      if (searchText) params.q = searchText
      fetchImages(params, false)
    }
    closeModel()
  }

  const removeCurrentFilter = (filterName) => {
    let filterObj = { ...filters }
    delete filterObj[filterName]
    setFilters({ ...filterObj })
    page = 1
    setData([])
    let params = {
      page,
      ...filterObj,
    }
    if (activeCategory) params.category = activeCategory
    if (searchText) params.q = searchText
    fetchImages(params, false)
  }

  const handleBackToTop = (scrollOffSet) => {
    // Show "Back to Top" button if scrolled more than 100 pixels
    if (scrollOffSet > 100) {
      setShowScrollUp(true)
    } else {
      setShowScrollUp(false)
    }
  }

  const fetchDataOfNextPage = () => {
    //if current page has enough data only then call for next page data
    if (data?.length > 23) {
      setIsEndReached(true) //state is used so that API does't call multiple times

      ++page
      let params = {
        page,
        ...filters,
      }
      if (activeCategory) params.category = activeCategory
      if (searchText) params.q = searchText
      fetchImages(params, true)
    } else {
      setIsEndReached(false)
    }
  }
  const handleScroll = (e) => {
    const contentHeight = e.nativeEvent.contentSize.height
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height
    const scrollOffSet = e.nativeEvent.contentOffset.y
    const bottomPosition = contentHeight - scrollViewHeight

    handleBackToTop(scrollOffSet)

    // Pagination
    if (scrollOffSet >= bottomPosition - 1) {
      if (!isEndReached) {
        fetchDataOfNextPage()
      }
    } else if (isEndReached) {
      setIsEndReached(false)
    }
  }
  const handleScrollUp = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    })
    setShowScrollUp(false)
  }
  return (
    <View style={{ flex: 1, paddingTop: paddingTop }}>
      {/* <StatusBar style="light" /> */}
      {/** Header */}
      <View style={style.headerContainer}>
        <Pressable onPress={handleScrollUp}>
          <Text style={style.pixel}>Find Wallpapers</Text>
        </Pressable>

        <Pressable onPress={openModel} style={{ padding: 10 }}>
          <FontAwesome6 name="bars-staggered" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5} //how often scroll event will fire while scrolling (in ms)
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
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

        {/** Applied filters */}
        {filters && (
          <AppliedFilters
            filters={filters}
            removeCurrentFilter={removeCurrentFilter}
          />
        )}
        {/** images masonry grid */}
        <View>
          {data.length > 0 && <ImageGrid data={data} route={route} />}
        </View>
        {/** loader */}
        {isLoading && (
          <View
            style={{ marginBottom: 70, marginTop: data?.length > 0 ? 10 : 70 }}
          >
            <ActivityIndicator size={'large'} color={theme.colors.black} />
          </View>
        )}
      </ScrollView>
      {showScrollUp && (
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <TouchableOpacity style={style.scrollUp} onPress={handleScrollUp}>
            <Feather name="arrow-up" size={22} color="white" />
            <Text style={style.scrollText}>Back to Top</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/** filter model */}
      <FiltersModal
        modalRef={modalRef}
        closeModel={closeModel}
        filters={filters}
        setFilters={setFilters}
        clearFilter={resetFilters}
        applyFilter={applyFilter}
      />
    </View>
  )
}

export default Home
