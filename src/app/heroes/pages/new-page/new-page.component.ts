import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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

  constructor( 
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ))
      ).subscribe( hero => {
        if( !hero ) return this.router.navigateByUrl('/');
        this.heroForm.reset( hero );
        return;
      })
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
          this.showSnackbar(`${ hero.superhero } updated!`);
        });
      return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`${ hero.superhero } created!`);
      });
    
  }

  onDeleteHero(){
    if( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    // El código de abajo esta bien solo se busca evitar
    // los dos subscribe 

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log('The dialog was closed');
    //   // console.log( {result} );
    //   if( !result ) return;
    //   // console.log('deleted');
    //   this.heroesService.deleteHeroById( this.currentHero.id)
    //     .subscribe( wasDeleted => {
    //       if( wasDeleted ){
    //         this.router.navigate(['/heroes']);
    //       }
    //     });
    // });

    // El código de abajo esta optimizado

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        // tap( result => console.log(result))
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id ) ),
        filter( (wasDeleted: boolean) => wasDeleted ),
        // tap( wasDeleted => console.log({ wasDeleted }))
      )
      .subscribe(() => {
      // console.log(result);
      this.router.navigate(['/heroes']);
      });

  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500
    });
  }

}
