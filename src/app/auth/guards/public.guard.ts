import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';

const checkAuthPublic = (): boolean | Observable<boolean> => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.checkAutentication()
        .pipe(
            tap( isAuthenticated => console.log('Authenticated:', isAuthenticated)),
            tap( (isAuthenticated) => {
                if(isAuthenticated){
                    router.navigate(['/']);
                }
            }),
            map( isAuthenticated => !isAuthenticated )
        );
}

export const canActivatePublicGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log('Can Activate');
    console.log({route, state});
    
    // return false;
    return checkAuthPublic();
};

export const canMatchPublicGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
    ) => {
        console.log('CanMatch');
        console.log({route, segments});
        
    // return false;
    return checkAuthPublic();
};