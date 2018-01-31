import { Injectable } from '@angular/core';
import { SDKToken, DevoteeApi } from '../sdk';
import { LoopBackAuth } from '../sdk';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User } from './models/user';
import { Devotee } from '../sdk';
import { NotificationService } from './notification.service';

import { InternalStorage } from '../sdk/storage/storage.swaps';


declare var Object: any;
@Injectable()
export class AuthService extends LoopBackAuth {

  // Create a stream of logged in status to communicate throughout app
  loggedIn$ = new BehaviorSubject<Boolean>(false);
  loggedIn: Boolean = false;

  public devoteeName = new BehaviorSubject<string>('');


    public sessiontoken: SDKToken = new SDKToken();
    private rememberMe: Boolean = true;

    constructor(
        internalStorage: InternalStorage, 
        private router: Router,
        private devoteeApi: DevoteeApi,
        private notificationService: NotificationService
    )
    {
        super(internalStorage);
        if (this.devoteeApi.isAuthenticated()) {
            this.setLoggedIn(true);
        }
    }

    private decode(devotee: Devotee) {
        this.devoteeName.next(devotee.spiritualName);
      }

    get isLoggedIn() {
        return this.loggedIn$.asObservable(); 
      }

    get getDevoteeName() {
        //return this.getCurrentUserData();
     return this.devoteeName.asObservable();
    }


    setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedIn$.next(value);
      }

    login(user: User) {
        this.devoteeApi.login({ username: user.userName, password: user.password }, 'user', true)
          .subscribe((token: SDKToken) => {
            super.save();
            this.loadFromSession();
            this.setLoggedIn(true);
            this.loggedIn = true;
            this.decode(token.user);
            this.notificationService.notificationSubject.next('Login Successful');
            this.router.navigate(['/']);
          }, err => {
            this.notificationService.notificationSubject.next('Login Failed');
            user.password = '';
          });
      }


      logout() {
        this.devoteeApi.logout().subscribe((response) => {
          // Clear Token and other local storage
        this.clearFromSession();
        this.notificationService.notificationSubject.next('Logout Successful');
        this.router.navigate(['/login']);
        this.setLoggedIn(false);

        });
      }


    clear(): void {
        super.clear();
        this.clearFromSession();
    }

    saveToSession(): void {
        this.rememberMe = true;
        this.persist('id', super.getAccessTokenId());
        this.persist('userId', super.getCurrentUserId);
        this.persist('user', super.getCurrentUserData());
    }

    loadFromSession(): void {
        this.sessiontoken.id = localStorage.getItem('id');
        this.sessiontoken.userId = localStorage.getItem('userId');
        this.sessiontoken.user = localStorage.getItem('user');
        if (this.sessiontoken.id && this.sessiontoken.user && this.sessiontoken.userId) {
            super.setUser(this.sessiontoken);
        }
    }

    clearFromSession(): void {
        Object.keys(this.sessiontoken).forEach(prop => localStorage.removeItem(prop));
        this.sessiontoken = new SDKToken();
    }

    persist(prop: string, value: any): void {
        if (this.rememberMe) {
            super.persist(prop, value);
        } else {
            localStorage.setItem(prop, JSON.stringify(value));
        }
    }
}
