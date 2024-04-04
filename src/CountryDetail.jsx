import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetail = () => {
    let params = useParams();
    const [countryDetails, setCountryDetails] = useState(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            const details = await fetch(`https://restcountries.com/v3.1/name/${params.name}`);
            const detailsJson = await details.json();
            setCountryDetails(detailsJson[0]);
        }
        fetchCountryDetails().catch(console.error);

    }, [params.name]);
    
}

export default CountryDetail()