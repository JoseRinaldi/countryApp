import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1'

  constructor(private httpClient:HttpClient) { }

  searchAlphaCode(code:string): Observable<Country | null>{

    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${ code }`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of(null)));

  }
  searchCapital(term:string): Observable<Country[]>{

    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    .pipe(catchError( () => of([])));

  }

  searchCountry (term:string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}`)
    .pipe(catchError( () => of([])));

  }

  searchRegion (region:string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${ region }`)
    .pipe(catchError( () => of([])));

  }
}
