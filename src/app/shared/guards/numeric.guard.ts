import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const numericIdGuard: CanActivateFn = (route) => {
    const router = inject(Router);
    const id = route.paramMap.get('id');
    const redirectTo = route.data['redirectTo'] || '/';

    if (!id || !/^\d+$/.test(id)) {
        return router.createUrlTree([redirectTo]);
    }

    return true;
};
