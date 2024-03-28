import { useState, useEffect} from 'react'
import './App.css'

function App() {

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all")
      const json = await response.json()
      console.log(json[100])
    }

    fetchCountryData()
  })

  return (
    <div>

    </div>
  )
}

export default App
