// import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
// import { tap } from 'rxjs';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth/services/auth.service';


// @Injectable({providedIn: 'root'})
// export class AuthGuard implements CanMatchFn, CanActivateFn {

//     constructor( 
    //  private authService: AuthService,
    //  private router: Router
    // ) { }

    // private checkAuthStatus(): boolean | Observable<boolean> {
    //  return this.authService.checkAutentication()
    //      .pipe(
            // tap( isAuthenticated => console.log('Authenticated:', isAuthenticated )) 
            // tap( isAuthenticated => {
            //      if( !isAuthenticated ) {
            //          this.router.navigate(['./auth/login'])
            //      }
            // }),
    //      )
    // }

//     canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
//         console.log('Can Match');
//         console.log(route, segments);
        
//         // throw new Error('Method not implemented.');

    //         return true;
//         return this.checkAuthStatus();
//     }
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
//         console.log('Can Activate');
//         console.log(route, state);
        
//         // throw new Error('Method not implemented.');
    //         return true; 
//         return this.checkAuthStatus();
//     }
    
// }

// La de abajo es la nueva forma de implementar los guards

const checkAuthStatus = (): boolean | Observable<boolean> => {
    // se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.checkAutentication()
        .pipe(
            tap( isAuthenticated => console.log('Authenticated:', isAuthenticated)),
            tap( (isAuthenticated) => {
                if(!isAuthenticated){
                    router.navigate(['/auth/login']);
                }
            })
        );
}

export const canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log('Can Activate');
    console.log({route, state});
    
    // return false;
    return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
    ) => {
        console.log('CanMatch');
        console.log({route, segments});
        
    // return false;
    return checkAuthStatus();
};