import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( code: string ): Observable <Country | null>{
    return this.http.get<Country[]>(`${ this.apiUrl}/alpha/${ code }`)
      .pipe(
        map (countries => countries.length > 0 ? countries[0]: null),
        catchError(error => of(null)) //si buscamos algo que no existe como capital se cacha el error y of me devuelve un nuevo observable null
      );
  }

  searchCapital( term:string ): Observable <Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl}/capital/${ term }`)
      .pipe(
        catchError(error => of([])) //si buscamos algo que no existe como capital se cacha el error y of me devuelve un nuevo observable conun objeto vacio que luego lo recibe el que se subscribe
      );
  }

  searchCountry( term:string ): Observable <Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl}/name/${ term }`)
      .pipe(
        catchError(error => of([])) //si buscamos algo que no existe como pais se cacha el error y of me devuelve un nuevo observable conun objeto vacio que luego lo recibe el que se subscribe
      );
  }

  searchRegion( region:string ): Observable <Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl}/region/${ region }`)
      .pipe(
        catchError(error => of([])) //si buscamos algo que no existe como region se cacha el error y of me devuelve un nuevo observable conun objeto vacio que luego lo recibe el que se subscribe
      );
  }

}

