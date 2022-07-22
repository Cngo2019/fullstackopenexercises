import axios from 'axios'
import React, { useState, useEffect } from 'react'

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [currentWord, setCurrentWord] = useState("")
  const [temperature, setTemp] = useState(0)
  const handleCurrentDisplay = (event) => {
    setCurrentWord(event.target.value)
  }
  useEffect(() => {
    axios
         .get("https://restcountries.com/v3.1/all")
         .then(response => {
          setCountryData(response.data)})
  }, [])

  const countryToDisplay = countryData.length == 0 ? [] : countryData.filter(item => item.name.common.toLowerCase().includes(currentWord.toLowerCase()))
  
  if (countryToDisplay.length == 1) {
      // If there is only 1 country in the list then obtain all the info:
      const item = countryToDisplay[0]
      const languageKeys = Object.keys(item.languages)
      const lon = item.latlng[1]
      const lat = item.latlng[0]
      axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => {
            //we can not set the temperature constant in a .then() due to asynchronous stuff. I.e, 
            //We are rendering the HTML before temperature is being set. So temperature is updated but is not displayed properly.
            setTemp(response.data.main.temp - 273.15)
          })
      return (
        <div>
        <input value={currentWord} onChange={handleCurrentDisplay} />
                  <div>
                       <li>{item.name.common}</li>
                       <h1>Languages</h1> 
                       {
                           languageKeys.map(key => {
                           return (
                           <li>{item.languages[key]}</li>
                           )
                        })
                        }
                       <h1>Capital: {item.capital[0]}</h1>
                        <img src={item.flags['png']}></img>
                        <p>Current temperature: ~ {Math.floor(temperature)} C</p>
                </div>
          </div>
      )
  }
  return (
    <div>
        <input value={currentWord} onChange={handleCurrentDisplay} />
          <ul>  
            {countryToDisplay.map(item => {
              return (
                <li>{item.name.common} <button value={item.name.common} onClick={() => {setCurrentWord(item.name.common)}}>show</button></li>
              )
            })
          }
          </ul>
     </div>
  )
}

export default App;
