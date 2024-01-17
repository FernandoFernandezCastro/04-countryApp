import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{


  public country?: Country;

  constructor(private activatedRoute: ActivatedRoute, //para poder capturar el parametro de la url
              private countryService: CountriesService,
              private router: Router  ){} //servicio para poder direccionar cuando no exista un pais asociado al parametro ingresado y se devuelva null

  ngOnInit(): void {
    //params es un observable al que hay q subscribirse pero el switchMap devuelve otro observable  mediante la funcion
    //this.countryService.searchCountryByAlphaCode(idBusqueda).Practicvamnete switchMap cambia el observable de params por el de la funcion
    //this.countryService.searchCountryByAlphaCode(idBusqueda) y por eso solo hay un subscribe
    this.activatedRoute.params
      .pipe(
        switchMap( ({idBusqueda }) => this.countryService.searchCountryByAlphaCode(idBusqueda)  )
      )
      .subscribe( country => {
        if(!country){
          return this.router.navigateByUrl('')
        }
        return this.country=country;
      })
    //una lternativa mas simplificada de obtener el parametro que se envia por la url es la siguiente:
    /*this.activatedRoute.params
      .subscribe( ({idBusqueda}) => { // a esto {idBusqueda} se le llama desestructurar el objeto params de donde de params solo obtenemos parmas.idBusqueda

        this.countryService.searchCountryByAlphaCode(idBusqueda)
          .subscribe( country => {
            console.log({country})
          })

      })*/

  }

}
