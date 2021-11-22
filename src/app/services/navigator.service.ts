import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlets } from '../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  constructor(private router: Router) {}

  hidePanel() {
    this.router.navigate(
      [
        {
          outlets: {
            [RouterOutlets.Right]: null,
          },
        },
      ],
      {}
    );
  }
}
