import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   {term: '', countries:[]},
    byCountries: {term: '', countries:[]},
    byRegion:    {region: '', countries:[]},
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage ();
  }

  private saveToLocalStorage(){
    localStorage.setItem ('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url:string): Observable<Country[]>{
    return this.http.get<Country[]> ( url )
      .pipe(
        catchError( () => of([])),
      );
  }

  searchCountryByAlphaCode( code: string ): Observable <Country | null>{
    return this.http.get<Country[]>(`${ this.apiUrl}/alpha/${ code }`)
      .pipe(
        map (countries => countries.length > 0 ? countries[0]: null),
        catchError(error => of(null)) //si buscamos algo que no existe como capital se cacha el error y of me devuelve un nuevo observable null
      );
  }

  searchCapital( term:string ): Observable <Country[]> {
    const url = `${ this.apiUrl}/capital/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countriesAux => {
          this.cacheStore.byCapital = {term: term, countries:countriesAux}
        }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountry( term:string ): Observable <Country[]> {
    const url = `${ this.apiUrl}/name/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countriesAux => {
          this.cacheStore.byCountries = {term: term, countries:countriesAux}
        }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchRegion( region:Region ): Observable <Country[]> {
    const url = `${ this.apiUrl}/region/${ region }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countriesAux => {
          this.cacheStore.byRegion = {region: region, countries:countriesAux}
        }),
        tap( () => this.saveToLocalStorage() )
      );
  }

}

