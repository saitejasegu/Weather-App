import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../city';

@Injectable({
  providedIn: 'root'
})
export class CityserviceService {

  constructor(private httpClient:HttpClient) { }

  getAllCities():Observable<Array<City>>{
    return this.httpClient.get<Array<City>>('http://localhost:3000/cities');
  }
  addNote(city:City):Observable<City>{
    return this.httpClient.post<City>('http://localhost:3000/cities',city);
  }
}
