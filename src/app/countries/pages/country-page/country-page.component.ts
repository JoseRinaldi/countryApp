import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country? : Country;

  constructor(
    private activatedRouter : ActivatedRoute,
    private router:Router,
    private countriesService : CountriesService) {}

  ngOnInit(): void {

     this.activatedRouter.params
     .pipe(
      switchMap(({id})=> this.countriesService.searchAlphaCode(id)),
     )
     .subscribe(country =>{
      if(!country){

        return this.router.navigateByUrl('');

      }

      // console.log('Tenemos un país');

      return this.country = country;;

     });
    // this.activatedRouter.params
     // .subscribe((params:any) =>(
       // console.log({ params: params.id }) al usuarlo asi de ir any en params
     // ));
     // .subscribe((params) =>(
     //   console.log({ params: params['id'] })
     // ));
    // .subscribe(({ id }) => {
       // console.log({ params: id })
    //   this.countriesService.searchAlphaCode( id )
    //   .subscribe(country =>{
    //     console.log({country})
    //   });
    // });

  }



}
