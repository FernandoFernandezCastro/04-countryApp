import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }


  private getCountriesRequest(url:string): Observable<Country[]>{
    return this.http.get<Country[]> ( url )
      .pipe(
        catchError( () => of([])),
        delay( 2000 )
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
  }

  searchCountry( term:string ): Observable <Country[]> {
    const url = `${ this.apiUrl}/name/${ term }`;
    return this.getCountriesRequest( url )
  }

  searchRegion( region:string ): Observable <Country[]> {
    const url = `${ this.apiUrl}/region/${ region }`;
    return this.getCountriesRequest( url )
  }

}

