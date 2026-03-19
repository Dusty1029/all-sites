import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const numericUUIDGuard: CanActivateFn = (route) => {
    const router = inject(Router);
    const id = route.paramMap.get('id');
    const redirectTo = route.data['redirectTo'] || '/';
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!id || !uuidV4Regex.test(id)) {
        return router.createUrlTree([redirectTo]);
    }

    return true;
};
