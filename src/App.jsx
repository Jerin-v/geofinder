import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all")
      const json = await response.json()
      setCountries(json)
      console.log(json)
    }

    fetchCountryData()
  },[])

  return (
    <div>
      <h1>Geo Finder</h1>
      <input
        type='text'
        placeholder='Search...'
      />
      <ul>
        {countries && countries.map(country => 
          <li key={country.cca2}>
            <img src={country.flags.png} />
            {country.name.common}
          </li>

        )}
      </ul>

    </div>
  )
}

export default App
