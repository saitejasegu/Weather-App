import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgAuthService } from "../../ng-auth.service";
import { Weather } from "../../Weather";
import {CityserviceService} from '../../service/cityservice.service';
import {City} from '../../city';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  flag: boolean = false;
  user:any;
  parsedJson: any;
  city:String ;
  cities: Array<City>;
  weather: Weather = new Weather();
  data: any;
  constructor(public ngAuthService: NgAuthService, private httpClient:HttpClient,private cityService: CityserviceService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.cityService.getAllCities().subscribe(
      data=>{
        this.cities=data;
        console.log(this.cities);
      },
      error=>{
        console.log(error);
      }
      
    );
  }
  onKey(event: any)
  {
      this.city=event.target.value;
      console.log(this.city);
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.city+'&appid=d42795876661ef466a7f9d63deebe5a6')
        .then(response=>response.json())
        .then(data=>{this.data=data})
  }
  addCity(){
    if(this.city==null)
    {
      alert("Enter City Name");
    }
    else
    {
      this.cities.forEach(element => {
        if(element.cityname==this.city)
        {
          this.flag=true
        }        
      });
      if(this.flag)
      {
        this.flag=false;
        alert("City Already Exists");
      }
      else
      {
        if(this.data==null)
        {
          alert("City Does not Exist");
        }
        else
        {
          // this.cities.push(new City(this.city)); 
          this.cityService.addNote(new City(this.city)).subscribe(
            data=>{
              this.cities.push(data);
            },
            error=>
            {
              console.log(error);
            }
          )
        }
      }
    }
    
  }
}