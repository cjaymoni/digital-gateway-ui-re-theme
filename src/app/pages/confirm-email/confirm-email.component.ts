import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmailComponent implements OnInit {
  token!: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        filter(d => !!d),
        take(1),
        switchMap(params => {
          if (params['token']) {
            this.token = params['token'];
            const url = environment.API_URL + '/api/v1/users/confirm-email';
            return this.httpClient.get(url).pipe(
              catchError(error => {
                window.location.href = '/';
                return EMPTY;
              }),
              map(response => {
                // send request to backend to verify token
                window.location.href = '/';
              })
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe();
  }
}

