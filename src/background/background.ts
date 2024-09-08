import { setStoredCities, setStoredOptions } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
  setStoredOptions({
    hasAutoOverlay: true,
    homeCity: '',
    tempScale: 'metric',
  })
})
