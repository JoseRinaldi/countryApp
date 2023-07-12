import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  constructor(private httpClient:HttpClient) { }

  private serarchCountriesRequest(url:string): Observable<Country[]>{

    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError( () => of([])),
      //delay( 2000 )
      );

  }

  searchAlphaCode(code:string): Observable<Country | null>{

    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${ code }`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of(null)));

  }
  searchCapital(term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`
    return this.serarchCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = { term, countries }),
      //tap( () => this.saveToLocalStorage() ),
    );

  }

  searchCountry (term:string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`
    return this.serarchCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = { term, countries }),
      //tap( () => this.saveToLocalStorage() ),
    );

  }

  searchRegion (region:Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${ region }`
    return this.serarchCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries }),
      //tap( () => this.saveToLocalStorage() ),
    );


  }
}
