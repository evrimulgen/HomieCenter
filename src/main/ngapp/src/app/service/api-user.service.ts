import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";
import {UserStatus} from "./user-status";
import {User} from "./user";


@Injectable()
export class ApiUserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'withCredentials': 'true'})
  };

  constructor(private http: HttpClient) {
  }

  public login(userName: string, userPassword: string, callback: any) {
    let body = new HttpParams()
      .set("username", userName)
      .set("password", userPassword)
      .toString();

    let thiz = this;
    this.http.post('/login', body, {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Accept' : 'text/html'})
      })
      .subscribe(
        null,
        error => {
          thiz.checkAuthentication(callback);
        },
        () => {
          thiz.checkAuthentication(callback);
        }
      );
  }

  private checkAuthentication(callback: any) {
    if (callback) {
      this.getStatus((userStatus) => {
        callback(userStatus);
      })
    };
  }

  public logout(callback: any) {
    this.http.post('/logout', null, this.httpOptions)
      .subscribe(response => {
          if (callback) {
            callback();
          }
        });
  }

  public getStatus(callback: any) {
    this.http.get('/api/user/status')
      .subscribe(response => {
        let userStatus = this.createUserStatus(response);
        if (callback) {
          callback(userStatus);
        }
      });
  }

  public getUsers(callback: any) {
    this.http.get('/api/user')
      .subscribe(response => {
        if (callback) {
          callback(<Array<User>>response);
        }
      });
  }

  public getUser(userId: number, callback: any) {
    this.http.get('/api/user/' + userId)
      .subscribe(response => {
        if (callback) {
          callback(<User>response);
        }
      });
  }

  public createUser(user: User, callback: any) {
    this.http.post('/api/user/create', JSON.stringify(user), this.httpOptions)
      .subscribe(response => {
          if (callback) {
            callback(<User>response);
          }
        },
        error => {
          if (callback) {
            callback(null);
          }
        });
  }

  public editUser(user: User, callback: any) {
    this.http.post('/api/user/edit', JSON.stringify(user), this.httpOptions)
      .subscribe(response => {
          if (callback) {
            callback(<User>response);
          }
        },
        error => {
          if (callback) {
            callback(null);
          }
        });
  }

  public deleteUser(userId: number, callback: any) {
    this.http.delete('/api/user/' + userId)
      .subscribe(response => {
          if (callback) {
            callback(true);
          }
        },
        error => {
          if (callback) {
            callback(false);
          }
        });
  }

  private createUserStatus(userJson: any): UserStatus {
    let userStatus = new UserStatus();
    userStatus.appVersion = userJson.appVersion;
    userStatus.name = userJson.name;
    userStatus.authenticated = userJson.authenticated;
    userStatus.role = userJson.role;
    return userStatus;
  }
}
