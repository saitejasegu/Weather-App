import { TitleCasePipe } from '@angular/common';
import { Component, OnInit ,Input } from '@angular/core';
import { City } from 'src/app/city';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-weatherwidget',
  templateUrl: './weatherwidget.component.html',
  styleUrls: ['./weatherwidget.component.css']
})
export class WeatherwidgetComponent implements OnInit {

  WeatherData: any;
  constructor(private comp:DashboardComponent) { }
  @Input() city : String;
  ngOnInit(): void {
    this.getWeatherData()
    console.log(this.city);
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.city+'&appid=d42795876661ef466a7f9d63deebe5a6')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    //console.log(this.WeatherData.weather[0].main)
    if(this.WeatherData.weather[0].main=="Clouds")
    {
      this.WeatherData.iscloudy=true;
      this.WeatherData.isRain=false
    }
    else if(this.WeatherData.weather[0].main=="Rain"){
      this.WeatherData.isRain=true;
      this.WeatherData.iscloudy=false;
    }
    //console.log(this.WeatherData);
    //this.comp.ngOnInit();
  }
}
