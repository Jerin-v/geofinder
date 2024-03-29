import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(null)

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
  const searchItems = searchValue => {
    setSearch(searchValue)
    if(searchValue !== "") {
      const filteredData = countries.filter(item => 
        item.name.common
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredData)
    } else {
      setFiltered(countries)
    }
  }


  //filter function
  //take an input to filter by 
  //filter out all data from country list 
  //return filtered data
  const filteredCountries = (filterValue, property,) => {
    const filteredData = countries.filter(item => 
      item[property]
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    )
    setFiltered(filteredData)
  }

  //To do 
  //add summary statistics containers [x]
  //summary statistics avg pop, # of landlocked countries, common language [x]
  //add filter buttons pop(slider?), continent, region, 
  //convert list to table format
  //add sidebar

  return (
    <div className='wholePage'>
      <h1>Geo Finder</h1>
      <div className='summaryStats'>
        <div className='statCard'>
          <h2>Largest Region</h2>
          <p>Asia</p>
        </div>
        <div className='statCard'>
          <h2>Most Common Language</h2>
          <p>Chinese</p>
        </div>
        <div className='statCard'>
          <h2>Landlocked Countries</h2>
          <p>44</p>
        </div>

      </div>
      <input
        type='text'
        placeholder='Search...'
        onChange={(input) => searchItems(input.target.value)}
      />
      <div className='listBox'>
        <table>
          <thead>
            <tr>
              <th>Flag</th>
              <th>Name</th>
              <th>Population</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {search.length > 0 ?
            (filtered.map(country => 
              <tr key={country.cca2}>
                <td><img src={country.flags.png} /></td>
                <td>{country.name.common}</td>
                <td>{country.population}</td>
                <td>{country.region}</td>
              </tr>
            )) :
            countries && (countries.map(country => 
              <tr key={country.cca2}>
                <td><img src={country.flags.png} /></td>
                <td>{country.name.common}</td>
                <td>{country.population}</td>
                <td>{country.region}</td>
              </tr>
            ))
            

            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default App
