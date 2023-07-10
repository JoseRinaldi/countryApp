import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1'

  constructor(private httpClient:HttpClient) { }

  searchCapital(term:string): Observable<Country[]>{

    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)

  }
}
