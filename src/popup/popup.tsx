import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import WeatherCard from './WeatherCard'
import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage'
import { InputBase, IconButton, Paper, Box, Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import './popup.css'
import 'fontsource-roboto'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return
    }
    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput('')
    })
  }

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    }
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }

  if (!options) {
    return null
  }

  return (
    <div>
      <Box sx={{ mx: '8px', my: '16px' }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Paper>
              <Box sx={{ px: '15px', py: '5px' }}>
                <InputBase
                  placeholder="Add a city name"
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                />
                <IconButton onClick={handleCityButtonClick}>
                  <Add />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Box sx={{ py: '4px' }}>
                <IconButton
                  className="scaleBtn "
                  onClick={handleTempScaleButtonClick}
                >
                  {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height="16px" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
