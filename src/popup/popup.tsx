import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { InputBase, IconButton, Paper, Box, Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import WeatherCard from './WeatherCard'
import './popup.css'
import 'fontsource-roboto'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(['London', 'Warsaw', 'Error'])
  const [cityInput, setCityInput] = useState<string>('')

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return
    }

    setCities([...cities, cityInput])
    setCityInput('')
  }

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1)
    setCities([...cities])
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
      <Box height="8px" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
