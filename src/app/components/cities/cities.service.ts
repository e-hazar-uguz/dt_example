import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CitiesService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllCities(){
    return this.http.get<any>( this.apiUrl+'cities');
  }

  
  getAllDistricts(){
    return this.http.get<any>( this.apiUrl+'districts');
  }

}
