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

  //search bar function



  //filter function

  return (
    <div>
      <h1>Geo Finder</h1>
      <input
        type='text'
        placeholder='Search...'
      />
      <div className='listBox'>
        {
          //change list into table format
          //move to another component if it gets too big
        }
        <ul>
          {countries && countries.map(country => 
            <li key={country.cca2}>
              <img src={country.flags.png} />
              {country.name.common}
              {country.population}
              {country.region}

            </li>

          )}
        </ul>
      </div>

    </div>
  )
}

export default App
