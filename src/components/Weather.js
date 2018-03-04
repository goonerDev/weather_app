import React from 'react';

//STATELESS Components
const Weather = props => (
            <div className="weather__info">                
                { props.city && props.country && <p> Location = {props.city}, {props.country} </p> }
                { props.temprature && <p> Temprature = {props.temprature} </p> }
                { props.temprature_min && props.temprature_max && <span> Min Temp = {props.temprature_min} - Max Temp = {props.temprature_max} </span> }
                { props.clouds && <p> Clouds = {props.clouds}% </p> }
                { props.wind && <p> Wind = {props.wind} </p> }
                { props.humidity && <p> Humidity = {props.humidity} </p> }
                { props.description && <p> Conditions = {props.description} </p> } 
                { props.error && <p className="weather__error"> {props.error} </p> } 
            </div>

);

export default Weather;