import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import WeatherCard from './WeatherCard'
import { setStoredCities, getStoredCities } from '../utils/storage'
import { InputBase, IconButton, Paper, Box, Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import './popup.css'
import 'fontsource-roboto'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
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

  return (
    <div>
      <Box sx={{ mx: 1 }}>
        <Paper>
          <Box sx={{ px: 2, py: 1 }}>
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
      </Box>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
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
