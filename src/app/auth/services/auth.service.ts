import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser():User|undefined{
        if( !this.user ) return undefined;
        // return {...this.user}; /** Se puede utilizar el operador spread para devolver el usuario */
        return structuredClone( this.user ); /** el structuredClone hace un deep Clone del objeto */
    }

    login( email: string, password: string):Observable<User>{
        // http.post('login', { email, password }); /** Esto es lo que se debería hacer, y se hace más adelante */
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                // tap( user => {
                //     this.user = user;
                //     localStorage.setItem('token', user.id.toString()); /** Se recomienda no utilizar muchas instrucciones en el tap */
                // })
                tap( user => this.user = user ),
                // tap( user => localStorage.setItem('token', user.id.toString()) )
                tap( user => localStorage.setItem('token', 'afdB234') )
            );
    }

    checkAutentication(): Observable<boolean> /** | boolean */ {
    // checkAuthentication(): Observable<boolean> {
        // if( !localStorage.getItem('token') ) return of(false);
        if( !localStorage.getItem('token') ) return of(false); /** return false */
        const token = localStorage.getItem('token');
        return this.http.get<User>(`${ this.baseUrl}/users/1`)
            .pipe(
                tap( user => this.user = user), /** El tap solo establece la propiedad no cambia el valor */
                map( user => !!user), /** Doble negación se asegura que se regresa un valor boolean */
                catchError( err => of(false))
            )
    }

    logout(){
        this.user = undefined;
        localStorage.clear();
    }
    
}