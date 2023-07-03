import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  // public id = new FormControl() /** Esta declaración solo sería un input reactivo */
  public heroForm = new FormGroup({ /** Esto declara el formulario reactivo como tal */
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  }); 

  public publishers = [
    { id: 'DC comics', desc: 'DC - Comics' },
    { id: 'Marvel comics', desc: 'Marvel - Comics' },
  ];

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void{
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value
    // });

    // this.heroesService.updateHero( this.heroForm.value ); // <-- Esto no se puede marca error por los tipos de datos por eseo fue necesario crear el getter currentHero

    if( this.heroForm.invalid ) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          // TODO: mostrar snackbar
        });
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
      });
    
  }

}
