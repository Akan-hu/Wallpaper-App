import axios from 'axios'

export const API_KEY = '43843109-4e492798787b30ddc131bee98'
export const API_URL = `https://pixabay.com/api/?key=${API_KEY}`
const formateUrl = (params) => {
  let url = API_URL + '&per_page=25&safesearch=true&editors_choice=true'
  if (!params) return url
  let paramKeys = Object.keys(params)
  paramKeys.map((key) => {
    let value = key == 'q' ? encodeURIComponent(params[key]) : params[key]
    url += `&${key}=${value}`
  })
  return url
}
export const apiCall = async (param) => {
  try {
    const response = await axios.get(formateUrl(param))
    const { data } = response
    return { success: true, data }
  } catch (e) {
    console.log(e.message)
    return { success: false, msg: e.message }
  }
}
