import React from 'react';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = "1d63b7f0759b90385a4c73fdb691a401";
//const API_URL = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=1d63b7f0759b90385a4c73fdb691a401";

//initialize compnent
class App extends React.Component{
    
    //Parameters for Weather data
    state = {
        temprature: undefined,
        temprature_min: undefined,
        temprature_max: undefined,
        clouds: undefined,
        wind: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        decsription: undefined,
        error: undefined
    }


    getWeather = async (e) => {
        e.preventDefault();
            const city = e.target.elements.city.value;
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await api_call.json();
        
        if(city) {
            //SET STATE
            this.setState({
                temprature : data.main.temp,
                temprature_min: data.main.temp_min,
                temprature_max: data.main.temp_max,
                clouds: data.clouds.all,
                wind: data.wind.speed,
                city : data.name,
                country : data.sys.country,
                humidity : data.main.humidity,
                description : data.weather[0].description,
                error: ""
            });
        
        } else {
            this.setState({
                temprature : undefined,
                temprature_min: undefined,
                temprature_max: undefined,
                clouds: undefined,
                wind: undefined,
                city : undefined,
                country : undefined,
                humidity : undefined,
                description : undefined,
                error: "Please enter the valid City name"
            });
        }
    }
    
    //////
    componentDidMount() {
        
        var url = 'https://freegeoip.net/json/';
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
                this.fetchTodayWeather(responseJson.region_name);
                this.fetchNext5DayWeather(responseJson.region_name);
          })
          .catch((error) => {
               this.setState({
                    temprature : undefined,
                    temprature_min: undefined,
                    temprature_max: undefined,
                    clouds: undefined,
                    wind: undefined,
                    city : undefined,
                    country : undefined,
                    humidity : undefined,
                    description : undefined,
                    error: "Unable to access your current location."
                });
          });
        
        
    }

fetchTodayWeather(city) {
        
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(
                data => this.setState({
                temprature : data.main.temp,
                temprature_min: data.main.temp_min,
                temprature_max: data.main.temp_max,
                clouds: data.clouds.all,
                wind: data.wind.speed,
                city : data.name,
                country : data.sys.country,
                humidity : data.main.humidity,
                description : data.weather[0].description,
                error: ""
            })
           );
    
    
  }
        
    
    render(){
        return(
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row form-container">
                                <center>
                                <div className="col-xs-12">
                                    <Form getWeather={this.getWeather} />
                                    <Weather 
                                        temprature = {this.state.temprature}
                                        temprature_min = {this.state.temprature_min}
                                        temprature_max = {this.state.temprature_max}
                                        clouds = {this.state.clouds}
                                        rain = {this.state.rain}
                                        snow = {this.state.snow}
                                        city = {this.state.city}
                                        country = {this.state.country}
                                        humidity = {this.state.humidity}
                                        description = {this.state.description}
                                        error= {this.state.error}
                                    />                                
                                </div>
                                </center>
            
                            </div>
            
            
                        </div>
                    </div>            
                </div>
            
            </div>
        );
    }
} 

export default App;