import {useState, useEffect} from 'react';

import Search from '../search/Search.jsx';


export default function Weather(){
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);

    function handleSearch(){
        fetchData(search);
    }

    async function fetchData(param){
        try{
            setLoading(true);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`);
            const data = await response.json();
            if(response.ok){
                console.log(data);
                setWeatherData(data);
            }else{
                throw new Error(response.statusText || "Something went wrong");
            }
        }catch(e){
            console.log(e);
            setError(e.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData('Delhi');
    }, [])

    
console.log(weatherData);
    return <>
        <div className="main-container">
            <div className="input-container">
                <Search search={search} setSearch={setSearch} handleSearch={handleSearch}/>
            </div>
            
                {loading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {!loading && !error && weatherData && (
                    <div className="weather-container">
                        <h2>{weatherData.name}, {weatherData?.sys?.country}</h2>
                        <p>Date</p>
                        <h1>{weatherData?.main?.temp}</h1>
                        <p>{weatherData.weather[0].description}</p>
                        <div className="weather-data">
                            <div className="column">
                                <p>{weatherData.wind.speed}</p>
                                <p>Wind speed</p>
                            </div>
                            <div className="column">
                                <p>{weatherData.main.humidity}</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>)
                }
            
        </div>
    </>
}