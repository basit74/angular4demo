import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  user$: Observable<firebase.User>;

  constructor( private auth: AuthService, private userService: UserService) { 
    
  }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
          .map( appUser => appUser.isAdmin);
  }

}
