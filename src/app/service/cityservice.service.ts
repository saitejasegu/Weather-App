import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityserviceService {

  constructor(private httpClient:HttpClient) { }

  getAllCities():Observable<Array<String>>{
    return this.httpClient.get<Array<String>>('http://localhost:3000/cities');
  }
  addNote(city:String):Observable<String>{
    return this.httpClient.post<String>('http://localhost:3000',city);
  }
}
