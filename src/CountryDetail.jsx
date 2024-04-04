import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetail = () => {
    let params = useParams();
    const [countryDetails, setCountryDetails] = useState(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            const details = await fetch(`https://restcountries.com/v3.1/alpha/${params.code}`);
            const detailsJson = await details.json();
            setCountryDetails(detailsJson[0]);
        }
        fetchCountryDetails().catch(console.error);

    }, [params.name]);

    return (
        <div>
            <h1>{countryDetails && countryDetails.name.common}</h1>
            <img
                className="images"
                src={countryDetails && countryDetails.flags.png}
                alt={`flag for ${params.code}`}
            />
            <h3>{ countryDetails && countryDetails.capital[0] }</h3>

        </div>
    )
    
}

export default CountryDetail;