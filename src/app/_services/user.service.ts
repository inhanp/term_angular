
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }
  getUser(userId) {
    return this.http.get<string>(`http://localhost:3030/user/find/${userId}`);
  }



  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }



}
