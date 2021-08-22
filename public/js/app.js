console.log("loading app.js");

const placeName = document.querySelector('#placeName');
const description = document.querySelector('#description');
const temperature = document.querySelector('#temperature');


const locationInput = document.querySelector('form input');
const form = document.querySelector('form');

// FETCH API


var dataLL = {}
var dataW = {}

function fetchWeather(address = 'London') {

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamVpc29uIiwiYSI6ImNrazV6Z3l5YTE5NmoycW51eDl1ZTFnODkifQ.nkgu2FxtBBbzy3k4c_hwRQ&limit=1'
  
  fetch(url).then((response) => {
    response.json().then((data) => {
      dataLL = data;
      if(dataLL.features.length === 0){
        placeName.textContent = "Unable to find location.";
      }else{
        // get lat lon
        const lat =  data.features[0].center[0];
        const lon =  data.features[0].center[1];
        
        //fetch weather
        const url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=be55a41dece6b4a5c451dc2553dfe9d1`;      
        fetch(url_weather).then((res)=>{
          res.json().then((jsonData)=>{
            dataW = jsonData;
            placeName.textContent = `Location: ${data.features[0].place_name}`;
            description.textContent = `Descripttion: ${dataW.weather[0].description}`;
            temperature.textContent = `Temperature: ${dataW.main.temp} degrees.`;
          });
        });
      }
    });
  });
}

form.onsubmit = (e)=>{
  e.preventDefault();
  const currentLocationInput = locationInput.value;
  if(currentLocationInput !== ""){
    placeName.textContent = "Loading...";
    fetchWeather(currentLocationInput);
  }else{
    placeName.textContent = "Input desired location";
  }
}