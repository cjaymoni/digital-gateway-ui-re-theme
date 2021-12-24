import { InjectionToken } from '@angular/core';
import { IAuthService } from 'src/app/models/auth-service';



export const LOGIN_SERVICE = new InjectionToken<IAuthService>('login_service');
