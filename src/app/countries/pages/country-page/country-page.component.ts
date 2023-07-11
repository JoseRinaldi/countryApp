import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {


  constructor(private activatedRouter : ActivatedRoute,
    private countriesService : CountriesService) {}

  ngOnInit(): void {

    this.activatedRouter.params
    // .subscribe((params:any) =>(
      // console.log({ params: params.id }) al usuarlo asi de ir any en params
    // ));
    // .subscribe((params) =>(
    //   console.log({ params: params['id'] })
    // ));
    .subscribe(({ id }) => {
      // console.log({ params: id })
      this.countriesService.searchAlphaCode( id )
      .subscribe(country =>{
        console.log({country})
      });
    });

  }



}
