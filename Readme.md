###### CONFUGURATION OVERVIEW #####
This app is built using Expo SDK 50.

###### App Functionality overview #######

  # App Functionality
  This React Native wallpaper app allows users to browse, search, filter, download, and share wallpapers fetched from the Pixabay RESTful API.

  # Key Features
  Displays a collection of wallpapers fetched from the Pixabay API.
  are categorized for easier navigation.
  Search Functionality

  Allows users to search for wallpapers by keywords.
  Displays search results dynamically as the user types.
  Filter Wallpapers

  Provides various filters to narrow down wallpaper choices.
  Filters include categories, orientation, type, and color.
    View Wallpaper Details

  Clicking on a wallpaper opens a detailed view.
  In the detailed view, users can see an enlarged version of the wallpaper.

  Option to download the wallpaper to the device.
  Saves images directly to the device’s storage.

  Option to share the wallpaper via social media or other sharing apps.


# this app built using expo router
router allows to navigate between app screen as well as in web pages

###### Libraries and dependencies ######

 ◦ Rect animated
uses: Reanimated comes with declarative API for creating animations. React Native Reanimated is a powerful animation library built by Software Mansion.
With Reanimated, you can easily create smooth animations and interactions that run on the UI thread.
# installation: npx create-expo-app my-app -e with-reanimated
run app again after clearing 
cache npx expo start -c

◦ React-native linear gradient
uses: creates an image consisting of a progressive transition between two or more colors along a straight line.
# installation: npm i expo-linear-gradient
Linear gradient is used on Welcome screen of application

◦ expo vector icons
# installation: npm i @expo/vector-icons

• FlashList
A React Native component that provides a fast and performant way to render lists.
Quit similar ot Flatlist but faster and more smooth than flatlist 
# installation: npx expo install @shopify/flash-list

• Axios
Axios is a popular JavaScript library used for making HTTP requests from a web browser or Node. js. It simplifies the process of sending asynchronous HTTP requests to a server, and also handles the response.
# installation: npm install axios

• Expo BlurView
A React component that blurs everything underneath the view. Common usage of this is for navigation bars, tab bars, and modals.
# installation: npx expo install expo-blur

• Expo file system
expo-file-system provides access to a file system stored locally on the device. It is also capable of uploading and downloading files from network URLs.
# installation npx expo install expo-file-system

• Expo sharing
expo-sharing allows you to share files directly with other compatible applications.
# installation: npx expo install expo-sharing

 • Expo router
 Expo Router is a file-based router for React Native and web applications. It allows you to manage navigation between screens in your app, allowing users to move seamlessly between different parts of your app's UI, using the same components on multiple platforms (Android, iOS, and web).
# installation: npx expo install expo-router react-native-safe-area-context 


# API OVERVIEW : PIXABAY
• Pixabay API is a RESTful interface for searching and retrieving royalty-free images and videos released by Pixabay under the Content License.
• The API returns JSON-encoded objects. Hash keys and values are case-sensitive and character encoding is in UTF-8. Hash keys may be returned in any random order and new keys may be added at any time.
• Required API Key: Ensure to include Pixabay API key in project environment.
 
• find more about API https://pixabay.com/api/docs


# Issues faced during development # 
bundlerIdentifier not found for ios
package.com not found for android

above issues can be solve by running this command
npm uninstall expo-dev-client