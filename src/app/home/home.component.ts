import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { IRequest, IUser } from 'app/core/models';
import { RequestService, UserService } from 'app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  requests: IRequest[];
  selectedRow: IRequest;
  user: IUser;
  timerSubscription: any;

  constructor(private requestService: RequestService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() : void {
    if (!localStorage.getItem('user')) {
      this.userService.get().subscribe(user => {
        this.user = user;
      },
                                       err => {
                                         console.error(err);
                                       });
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.refreshData();
  }

  refreshData(): void {
    this.requestService.get().subscribe(data => {
      this.requests = data;
      this.subscribeToData();
    }, err => {
      console.error(err);
    });
  }

  private subscribeToData(): void {
    const refresh = timer(5000);
    this.timerSubscription = refresh.subscribe(() => this.refreshData());
  }

  public ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
