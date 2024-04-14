import React, { useState } from 'react'
import './wheather.css';
import axios from 'axios';
import search from '../assets/search.png';
import cloud from '../assets/cloud.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import clear from '../assets/clear.png';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png'


function Wheather() {
    const [weather, setweather] = useState({
        celcius: 10,
        name: 'Morshi',
        humidity: 10,
        speed: 2,
        image: cloud
    })

    const[name,setName]=useState('')
 

    const handleClick=()=>{
        if(name !==''){

            let url=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=d05217870cb810410df3bc6017bd7473&units=metric`
            axios.get(url).then(response => {

                let imgPath=''
                if(response.data.weather[0].main=='Clear'){
                    imgPath=clear
                  
                }
            
                else if(response.data.weather[0].main=='Clouds'){
                    imgPath=cloud
                   
                }
                else if(response.data.weather[0].main=='Rain'){
                    imgPath=rain
                   
                }
                else if(response.data.weather[0].main=='Smoke'){
                    imgPath=snow
                    
                }
                else if(response.data.weather[0].main=='Haze'){
                    imgPath=drizzle
                  
                }
               
                setweather({ ...weather, celcius: response.data.main.temp, name: response.data.name, humidity: response.data.main.humidity, 
                    speed: response.data.wind.speed, image:imgPath})
              
            })
    
        }
    }

    return (
        <>
        <h1>Weather App</h1>
        <div className='container'>
            <div className='topbar'>
                <input className='cityInput' placeholder='Search...' onChange={e=>setName(e.target.value)}/>
                <span className='searchIcon'  onClick={handleClick}>
                    <img src={search} />
                </span>
            </div>

            <div className='weather'>
                <img src={weather.image} />
                <h1 >{Math.round(weather.celcius)} deg C</h1>
                <p  >{weather.name}</p>

                <div className='humidity-wind'>
               
                        <img src={humidity} />
                        <p style={{marginRight:'1.5rem'}} >{weather.humidity} humidity</p>
           

                        <img src={wind} />
                        <p>{weather.speed}km/hr wind speed</p>
                   
                </div>
            </div>
        </div>
        </>
    )
}

export default Wheather