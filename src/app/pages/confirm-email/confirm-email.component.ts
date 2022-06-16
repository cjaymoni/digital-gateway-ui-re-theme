import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/services/login.service';

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
    private loginService: LoginService,
    private navigator: NavigatorService,
    private alert: AppAlertService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        filter(d => !!d),
        take(1),
        switchMap(params => {
          if (params['token']) {
            this.token = params['token'];
            return this.loginService.verifyEmail(this.token).pipe(
              map(_ => {
                // send request to backend to verify token
                this.alert.showToast('Email verified successfully');
                this.navigator.router.navigateByUrl('/');
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

