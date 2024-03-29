import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(null)
  const [value, setValue] = useState("All")
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
    if(searchValue !== "" && value === "All") {  // and dropdown filter is empty
      const filteredData = countries.filter(item => 
        item.name.common
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredData)
    } else if(searchValue !== "" && value !== "All")  { // else if search value AND dropdown filter full, filteredData filters through dropdown filter
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
    setValue(e.target.value)
    filteredRegions(e.target.value)

  }

  



  //To do 
  //add summary statistics containers [x]
  //summary statistics avg pop, # of landlocked countries, common language [x]
  //add filter buttons pop(slider?), continent, region, 
  //convert list to table format [x]
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

      <label>
        Region:
        <select value={value} onChange={handleChange}>
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
            {search.length === 0 && value === "All" ?
              countries && (countries.map(country => 
                <tr key={country.cca2}>
                  <td><img src={country.flags.png} /></td>
                  <td>{country.name.common}</td>
                  <td>{country.population}</td>
                  <td>{country.region}</td>
                </tr>
              )) : 
              search.length === 0 && value !== "All" ?
                (region.map(country => 
                <tr key={country.cca2}>
                  <td><img src={country.flags.png} /></td>
                  <td>{country.name.common}</td>
                  <td>{country.population}</td>
                  <td>{country.region}</td>
                </tr>
              )) :
              (filtered.map(country => 
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
