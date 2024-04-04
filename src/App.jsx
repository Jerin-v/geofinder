import { useState, useEffect} from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(null)
  const [regionValue, setRegionValue] = useState("All")
  const [region, setRegion] = useState(null)
  const regions = Array.from(new Set(countries.map(country => country.region)))


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
    if(searchValue !== "" && regionValue === "All") {  // and dropdown filter is empty
      const filteredData = countries.filter(item => 
        item.name.common
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredData)
    } else if(searchValue !== "" && regionValue !== "All")  { // else if search value AND dropdown filter full, filteredData filters through dropdown filter
       const filteredRegions = region.filter(item => 
          item.name.common 
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
        setFiltered(filteredRegions)
    } else {
      setFiltered(countries)
    }
  }


  //filter function
 //takes region value and returns filtered list
  const filteredRegions = (filterValue) => {
    const filteredData = countries.filter(item => 
      item.region
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    )
    setRegion(filteredData)
  }

  const handleChange = (e) => {
    setRegionValue(e.target.value)
    filteredRegions(e.target.value)

  }

  const renderCountryRow = (country) => (
    <tr key={country.cca2}>
      <td><img src={country.flags.png} alt={country.name.common} /></td>
      <td>
        <Link to={`/countryDetails/${country.cca3}`} style={{color: 'white', textDecoration: 'underline'}}>
          {country.name.common}
        </Link>
      </td>
      <td>{country.population}</td>
      <td>{country.region}</td>
    </tr>
  );

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

      <label>
        Region:
        <select value={regionValue} onChange={handleChange}>
          <option key="All" value="All">All</option>
          {regions.map(region =>
            <option key={region} value={region}>{region}</option>
          )}
        </select>

      </label>
      
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
            {search.length === 0 && regionValue === "All" ?
              countries && countries.map(renderCountryRow) : 
              search.length === 0 && regionValue !== "All" ?
                region.map(renderCountryRow) :
                filtered.map(renderCountryRow)
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default App
