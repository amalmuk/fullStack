
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const payloadPart = token.split('.')[1];

    if (!payloadPart) {
      throw new Error('Token invalide');
    }

    const payload = JSON.parse(atob(payloadPart));

    // Vérifier la date d'expiration
    if (!payload.exp || payload.exp * 1000 <= Date.now()) {
      sessionStorage.removeItem('token');
      return router.createUrlTree(['/login']);
    }

    return true;

  } catch {
    sessionStorage.removeItem('token');
    return router.createUrlTree(['/login']);
  }
};
