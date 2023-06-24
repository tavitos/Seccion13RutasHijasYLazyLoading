import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl(''); /** Para utilizarlo hay que importar el Módulo ReactiveFormsModule en el modulo Heroes */
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  searchHero(){
    const value: string = this.searchInput.value || '';
    // console.log({value});
    this.heroesService.getSuggestions( value )
      .subscribe( heroes => this.heroes = heroes );
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent):void {
    // console.log(event.option.value);
    if( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;
  }

}
